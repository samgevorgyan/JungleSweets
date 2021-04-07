import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from '../../../shared/services/toastr.service';

@Component({
  selector: 'jungle-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm = this.fb.group({
    emailForm: ['', [Validators.required, Validators.email]],
    passwordForm: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.afAuth.signOut();
  }

  get email() {
    return this.adminLoginForm.get('emailForm');
  }
  get password() {
    return this.adminLoginForm.get('passwordForm');
  }
  logIn() {
    if (
      !this.email.value.includes('glesw') ||
      !this.password.value.includes('aiso')
    ) {
      this.toast.error('only admin can log in');
      return;
    }
    this.afAuth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((res) => {
        if (res.user) {
          this.adminService.isLogedin = true;

          this.router.navigate(['./main'], { relativeTo: this.route });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
