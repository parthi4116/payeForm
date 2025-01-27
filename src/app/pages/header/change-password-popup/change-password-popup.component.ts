import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {
  passwordForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ChangePasswordPopupComponent>
  ) { };

  ngOnInit() {
    this.initForm();

  };

  initForm() {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          this.passwordStrengthValidator(),
        ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.matchPasswordsValidator }
    );
  }
  passwordStrengthValidator() {
    return (control: any) => {
      const value = control.value || '';
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasNumbers = (value.match(/\d/g) || []).length >= 2;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const isValid =
        value.length >= 8 &&
        value.length <= 15 &&
        hasSpecialChar &&
        hasNumbers &&
        hasUpperCase &&
        hasLowerCase;

      return isValid ? null : { weakPassword: true };
    };
  }

  matchPasswordsValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    console.log("test");
    this.submitted = true;
    const controls = this.passwordForm.controls;

    if (this.passwordForm.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched();
      });
      return;
    }

    let oldPassword = localStorage.getItem('userPwd')

    if (controls['currentPassword'].value != oldPassword) {
      return this.toastr.error("The current password you entered is incorrect.")
    } else if (controls['currentPassword'].value == controls['newPassword'].value) {
      return this.toastr.error("Please choose a new password. The new password must be different from the current password.");

    }

    localStorage.setItem("userPwd", controls['newPassword'].value)
    this.router.navigate(['/auth'])
    return this.dialogRef.close();

  }

  closeModal() {
    this.dialogRef.close();
  }
}
