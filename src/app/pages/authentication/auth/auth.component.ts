import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jungle-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isEmailInvalid = false;
  isEmailRequired = false;
  isPasswordInvalid = false;
  isPasswordRequired = false;
  isSignIn = true;
  signInForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: [''],
    lastName: [''],
  });

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  validation(): boolean {
    if (this.email.errors) {
      if (this.email.errors.required) {
        this.isEmailRequired = true;
        this.isEmailInvalid = false;
      } else if (this.email.errors.pattern) {
        this.isEmailRequired = false;
        this.isEmailInvalid = true;
      }

      return false;
    } else {
      this.isEmailInvalid = false;
      this.isEmailRequired = false;
    }
    if (this.password.errors) {
      if (this.password.errors.required) {
        this.isPasswordRequired = true;
        this.isPasswordInvalid = false;
      } else if (this.password.errors.minlength) {
        this.isPasswordRequired = false;
        this.isPasswordInvalid = true;
      }
      return false;
    } else {
      this.isPasswordRequired = false;
      this.isPasswordInvalid = false;
    }

    return true;
  }
  authenticate() {
    if (this.validation()) {
      if (this.isSignIn) {
        // sign in
      } else {
        // sign up
      }
    }
  }
}
