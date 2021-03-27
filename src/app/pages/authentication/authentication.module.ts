import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../modules/share/share.module';
import { AuthComponent } from './auth/auth.component';
import { VerificationComponent } from './validaton/verification.component';
import { FormsModule } from '@angular/forms';
import { LoginGuard } from './login-guard';

export const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'verification', component: VerificationComponent },
];

@NgModule({
  declarations: [AuthComponent, VerificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormsModule,
  ],
})
export class AuthenticationModule {}
