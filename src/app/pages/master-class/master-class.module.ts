import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterClassComponent } from './master-class.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../modules/share/share.module';

export const routes: Routes = [{ path: '', component: MasterClassComponent }];

@NgModule({
  declarations: [MasterClassComponent],
  imports: [CommonModule, ShareModule, RouterModule.forChild(routes)],
})
export class MasterClassModule {}
