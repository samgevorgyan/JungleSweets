import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/modules/share/share.module';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminLoginGuard } from './guards/login.guard';
import { AboutMeAdminComponent } from './about-me/about-me-admin.component';
import { AssortmentAdminComponent } from './assortment/assortment-admin.component';
import { MasterClassComponent } from './master-class/master-class.component';

export const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'main', component: AdminComponent },
  { path: 'about', component: AboutMeAdminComponent },
  { path: 'assortments', component: AssortmentAdminComponent },
  { path: 'master-class', component: MasterClassComponent },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AboutMeAdminComponent,
    AssortmentAdminComponent,
    MasterClassComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ShareModule,
    OrderModule,
    FormsModule,
  ],
  providers: [AdminLoginGuard],
})
export class AdminModule {}
