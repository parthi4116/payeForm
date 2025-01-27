import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userPwdCheck: any;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService) { }

  ngOnInit() {
    this.userPwdCheck = localStorage.getItem('userPwd');
    this.initForm()
  };

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    const controls = this.loginForm.controls;

    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched()
      });
    }

    if ( this.userPwdCheck != null) {
      if (controls['password'].value != this.userPwdCheck) {
       return this.toastr.error("The password you entered is incorrect. Please check and try again.");
       }
    };

    let userData = {
      userName: controls['username'].value,
      userPwd: controls['password'].value
    }
    return this.auth.login(userData);
  }

}
