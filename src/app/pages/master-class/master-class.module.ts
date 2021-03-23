import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterClassComponent } from './master-class.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [{ path: '', component: MasterClassComponent }];

@NgModule({
  declarations: [MasterClassComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MasterClassModule {}
