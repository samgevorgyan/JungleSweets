import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from './user.interface';
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from '../../shared/services/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  params: any;
  emailVerified: boolean;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private localize: LocalizeRouterService,
    private toast: ToastrService
  ) {
    this.isLoggedIn().subscribe((res) => {
      if (res) {
        this.emailVerified = res.emailVerified;
      }
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.oobCode) {
        console.log('arams.oobCode', params);
        this.params = params;
      }
    });
  }

  verifyCode() {
    if (!this.params.oobCode) {
      return;
    }
    return this.afAuth
      .checkActionCode(this.params.oobCode)
      .then((res) => {
        if (res.operation && res.operation.includes('VERIFY_EMAIL')) {
          return this.afAuth
            .applyActionCode(this.params.oobCode)
            .then(() => {
              return true;
            })
            .catch((error) => {
              console.log('err from apply action code', error);
              return error;
            });
        }
      })
      .catch((error) => {
        return error;
      });
  }

  public isLoggedIn(): Observable<User> {
    return this.afAuth.authState;
  }
  setVerifiedEmail(user) {
    const userInfo: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
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
        this.sendVerificationMail(result.user);
        userInfo.uid = result.user.uid;
        userInfo.emailVerified = result.user.emailVerified;
        this.SetUserData(userInfo);
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
    user
      .sendEmailVerification()
      .then((res) => {
        const urlToNavigate: any = this.localize.translateRoute(
          '/master-class'
        );
        this.router.navigate([urlToNavigate]);
      })
      .catch((error) => {
        console.log('error from send email veirfy', error);
      });
  }
  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
