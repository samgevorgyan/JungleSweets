import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.interface';
import { firstValueFrom, Observable } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { ToastrService } from '../../shared/services/toastr.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FbStoragePaths } from '../../enums/fbStoragePaths';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  params: any;
  emailVerified: boolean;
  user: User;
  dbUser: User;
  videoLink: string;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,
    private localize: LocalizeRouterService,
    private toast: ToastrService,
    private storage: AngularFireStorage
  ) {
    this.isLoggedIn().subscribe((user) => {
      this.user = user;
      if (user) {
        console.log('user', user);
        this.getUserFromDb();
        this.emailVerified = user.emailVerified;
      } else {
        this.emailVerified = false;
      }
    });

    const ref = this.storage.ref(FbStoragePaths.macaronVideo);
    ref.getDownloadURL().subscribe((res) => {
      this.videoLink = res;
    });
  }

  async verifyEmail(oobCode: string) {
    await firstValueFrom(this.isLoggedIn());

    if (this.user && !this.emailVerified) {
      return this.afAuth
        .checkActionCode(oobCode)
        .then((res) => {
          if (res.operation && res.operation.includes('VERIFY_EMAIL')) {
            this.afAuth.applyActionCode(oobCode).then(() => {
              this.toast
                .success(
                  'AUTHENTICATION.VERIFICATION.SUCCESS.VERIFICATION_SUCCESS'
                )
                .then(() => {
                  const urlToNavigate: any = this.localize.translateRoute(
                    '/authentication'
                  );
                  this.emailVerified = true;
                  this.router.navigate([urlToNavigate]);
                });
            });
          }
        })
        .catch((error) => {
          return error;
        });
    } else {
      const urlToNavigate: any = this.localize.translateRoute(
        '/authentication'
      );
      this.router.navigate([urlToNavigate]);
      if (this.user) {
        this.toast.success(
          'AUTHENTICATION.VERIFICATION.SUCCESS.VERIFICATION_SUCCESS_ALREADY',
          4000
        );
      } else {
        this.toast.error(
          'AUTHENTICATION.VERIFICATION.ERRORS.SING_IN_FOR_VERIFICATION',
          4000
        );
      }
    }
  }

  resetPassword(oobCode: string, newPassword: string) {
    return this.afAuth
      .confirmPasswordReset(oobCode, newPassword)
      .then(() => {
        const urlToNavigate: any = this.localize.translateRoute(
          '/authentication'
        );
        this.router.navigate([urlToNavigate]);
        this.toast.success(
          'AUTHENTICATION.VERIFICATION.SUCCESS.VERIFICATION_SUCCESS_PASSWORD'
        );
        return true;
      })
      .catch((error) => {
        if (error.message && error.message.includes('expired')) {
          this.toast.error(
            'AUTHENTICATION.VERIFICATION.ERRORS.RESET_PASSWORD_CODE_EXPIRED'
          );
        }
        return error;
      });
  }

  public isLoggedIn(): Observable<any> {
    return this.afAuth.authState;
  }

  setVerifiedEmail(user) {
    const userInfo: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      isPurchased: false,
    };

    this.SetUserData(userInfo);
  }

  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('result after sign in', result);
        this.emailVerified = result.user.emailVerified;
        const urlToNavigate: any = this.localize.translateRoute(
          '/master-class'
        );
        this.router.navigate([urlToNavigate]);
      })
      .catch((error) => {
        if (error.message && error.message.includes('password is invalid')) {
          this.toast.error('AUTHENTICATION.ERRORS.WRONG_PASSWORD');
        } else if (error.message && error.message.includes('no user')) {
          this.toast.error('AUTHENTICATION.ERRORS.UNREGISTERED_EMAIL');
        }
      });
  }

  // Sign out
  signOut() {
    this.afAuth.signOut().then(() => {
      const urlToNavigate: any = this.localize.translateRoute('/home');
      this.router.navigate([urlToNavigate]);
    });
  }

  // Sign up with email/password
  signUp(userInfo: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((result) => {
        userInfo.uid = result.user.uid;
        userInfo.emailVerified = result.user.emailVerified;
        this.SetUserData(userInfo);
        this.sendVerificationMail(result.user).then((res) => {
          const urlToNavigate: any = this.localize.translateRoute(
            '/master-class'
          );
          this.router.navigate([urlToNavigate]);
        });
      })
      .catch((error) => {
        if (error.message && error.message.includes('in use')) {
          this.toast.error('AUTHENTICATION.ERRORS.EMAIL_EXIST');
        }
        return error;
      });
  }

  SetUserData(user) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      emailVerified: user.emailVerified,
      isPurchased: false,
    };
    return this.afs
      .doc(`users/${user.uid}`)
      .set(userData, {
        merge: true,
      })
      .catch((error) => {
        console.log('eerrrrrror', error);
      });
  }

  // Send email verification when new user sign up
  sendVerificationMail(user) {
    return user.sendEmailVerification();
  }

  // Resend email verification link
  reSendVerificationMail(user) {
    return user.sendEmailVerification().then((res) => {
      this.toast.success(
        'AUTHENTICATION.VERIFICATION.SUCCESS.RESEND_CODE_SUCCESS',
        5000
      );
    });
  }

  // Reset Forgot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toast.success(
          'AUTHENTICATION.VERIFICATION.SUCCESS.FORGOT_PASSWORD_LINK_SEND',
          5000
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  getUserFromDb() {
    this.afs
      .doc<any>(`users/${this.user.uid}`)
      .valueChanges()
      .subscribe((dbUser) => {
        this.dbUser = dbUser;
      });
  }
}
