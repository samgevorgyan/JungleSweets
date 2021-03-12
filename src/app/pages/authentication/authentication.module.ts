import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { ShareModule } from '../../modules/share/share.module';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
];

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ShareModule],
})
export class AuthenticationModule {}
