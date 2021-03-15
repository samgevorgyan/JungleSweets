import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../modules/share/share.module';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
];

@NgModule({
  declarations: [AuthenticationComponent, AuthComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ShareModule],
})
export class AuthenticationModule {}
