import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-foundTransfer',
  templateUrl: './fundTransfer.component.html',
  styleUrls: ['./fundTransfer.component.scss']
})
export class FundTransferComponent implements OnInit, OnDestroy {
  accNumber: any='';
  checkedData: boolean;
  accType: string;
  validDateError: boolean = false;

   constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  checkFun() {
    this.checkedData = true;
  }

  checkValidate(type: any) {
    if (type != "close") {
      if (this.accNumber == "") {
        this.validDateError = true
      }
        this.router.navigate(['/dashboard/payerdetail/',this.accNumber]);
    } else {
      this.accNumber = ""
    }
  };

  ngOnDestroy() {

   }
}
