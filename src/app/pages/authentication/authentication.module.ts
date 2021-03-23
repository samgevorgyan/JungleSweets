import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../modules/share/share.module';
import { AuthComponent } from './auth/auth.component';
import { VerificationComponent } from './validaton/verification.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'verification', component: VerificationComponent },
];

@NgModule({
  declarations: [AuthComponent, VerificationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ShareModule],
})
export class AuthenticationModule {}
