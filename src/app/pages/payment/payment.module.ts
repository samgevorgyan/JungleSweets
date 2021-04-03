import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../modules/share/share.module';

export const routes: Routes = [{ path: '', component: PaymentComponent }];

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, ShareModule, RouterModule.forChild(routes)],
})
export class PaymentModule {}
