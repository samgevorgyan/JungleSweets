import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { ToastrService } from '../../../shared/services/toastr.service';

@Component({
  selector: 'jungle-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  public malformed = false;
  constructor(
    private auth: AuthService,
    private localize: LocalizeRouterService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.auth
      .isLoggedIn()
      .pipe(take(1))
      .subscribe((user) => {
        console.log('useeer', user);
        if (user && user.emailVerified === false) {
          this.auth.verifyCode().then((res) => {
            console.log('res from verification conp', res);
            if (typeof res === 'boolean') {
              this.toast
                .success(
                  'AUTHENTICATION.VERIFICATION.ERRORS.VERIFICATION_SUCCESS'
                )
                .then(() => {
                  const urlToNavigate: any = this.localize.translateRoute(
                    '/authentication'
                  );
                  this.router.navigate([urlToNavigate]);
                });
            } else if (res.message.includes('malformed')) {
              this.malformed = true;
            }
          });
        } else {
          const urlToNavigate: any = this.localize.translateRoute(
            '/authentication'
          );
          this.router.navigate([urlToNavigate]);
        }
      });
  }

  reSendEmailVerify() {}
}
