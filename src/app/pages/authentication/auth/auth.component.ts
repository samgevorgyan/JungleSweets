import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.interface';

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
      'samvelgevorgyan87@gmail.com',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['asdasdsad', [Validators.required, Validators.minLength(6)]],
    firstName: [''],
    lastName: [''],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  get firstName() {
    return this.signInForm.get('firstName');
  }
  get lastName() {
    return this.signInForm.get('lastName');
  }
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
        this.authService.signIn(this.email.value, this.password.value);
      } else {
        // sign up
        const userInfo: User = {
          email: this.email.value,
          emailVerified: false,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          password: this.password.value.trim(),
          uid: '',
          isPurchased: false,
        };
        this.authService.signUp(userInfo).then((resultcomp) => {
          console.log('result arden componentum', resultcomp);
        });
      }
    }
  }

  restorePassword() {
    if (this.email.value) {
      this.authService.forgotPassword(this.email.value.trim());
    }
  }
}
