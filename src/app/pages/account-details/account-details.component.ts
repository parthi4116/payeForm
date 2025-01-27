import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  payerDetail: any;
  accNumber: any;
  payerForm: FormGroup;
  submitted: any

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toaster: ToastrService

  ) { };

  ngOnInit() {
    this.accNumber = this.activeRoute.snapshot.paramMap.get('accNum');
    this.getPayerDetail();
    this.initForm()
    this.cdr.detectChanges()
  }
  initForm() {
    this.payerForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      accountBranch: ['', Validators.required],
      accountName: ['', Validators.required],
      fspId: ['', Validators.required],
      accountCategory: ['', Validators.required],
      accountType: ['', Validators.required],
      accountDescription: ['', Validators.required],
      accountAmount: ['', Validators.required],
      accountCurrency: ['', Validators.required],
      endUserAmount: ['', Validators.required],
      endUserCurrency: ['', Validators.required],
    });
  }


  getPayerDetail() {
    let endPoint = "assets"
    let sendParam = { accNum: this.accNumber }
    let detailApi = this.auth.apiCall(endPoint, sendParam).subscribe((data: any) => {
      this.payerDetail = data.data;
      this.cdr.detectChanges()
    });
    this.unsubscribe.push(detailApi);
  };

  onSubmit() {
    this.submitted = true;
    const controls = this.payerForm.controls;

    if (this.payerForm.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched()
      });
      return
    };

    let tempData: any = []
    let endPoint = "assets";

    Object.keys(controls).forEach(controlName => {
      tempData.push({ [controlName]: controls[controlName].value })
    });

    let sendParam = Object.assign({}, ...tempData);

    let payerAdd= this.auth.apiCall(endPoint, sendParam).subscribe((data: any) => {
       this.toaster.success("Payment Request Submitted!!!");

    })
    this.unsubscribe.push(payerAdd);

  }

  removeSelcetedData(type: any) {
    const controls = this.payerForm.controls[`${type}`];
    controls.setValue("");
    controls.setErrors(null);
    this.cdr.detectChanges();
  };

  resetForm() {
    this.submitted = false;
    const controls = this.payerForm.controls;
    Object.keys(controls).forEach(controlName => {
      controls[controlName].setValue("")
      controls[controlName].setErrors(null);
      controls[controlName].setValidators(Validators.required);
      controls[controlName].updateValueAndValidity()
      this.cdr.detectChanges()
    });
    this.cdr.detectChanges()
  };

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());

  };
}
