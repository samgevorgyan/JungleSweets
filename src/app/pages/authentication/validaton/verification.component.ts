import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../../../shared/services/toastr.service';
import firebase from 'firebase';
import User = firebase.User;

@Component({
  selector: 'jungle-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  public malformed = false;
  public resendEmail = false;
  userEmail: string;
  params: any = null;
  public isPassword: boolean;
  public passwordLengthError = false;
  constructor(
    private auth: AuthService,
    private localize: LocalizeRouterService,
    private router: Router,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.oobCode) {
        this.params = params;
      }
    });
  }

  ngOnInit(): void {
    if (this.params && this.params.mode === 'verifyEmail') {
      this.verifyEmail();
    } else {
      this.isPassword = true;
    }
  }
  verifyEmail() {
    if (!this.params.oobCode) {
      return;
    }
    this.auth.verifyEmail(this.params.oobCode).then((res) => {
      if (!res) {
        return;
      }
      if (res.message.includes('malformed')) {
        this.malformed = true;
        this.resendEmail = false;
      }
    });
  }

  resetPassword(password: string) {
    if (!password) {
      return;
    } else if (password.length < 6) {
      this.passwordLengthError = true;
    } else {
      this.passwordLengthError = false;
      this.auth.resetPassword(this.params.oobCode, password);
    }
  }
  reSendEmailVerify() {
    this.auth.reSendVerificationMail(this.auth.user).then((_) => {
      this.userEmail = this.auth.user.email;
      this.malformed = false;
      this.resendEmail = true;
    });
  }
}
