import { ShareModule } from './../../modules/share/share.module';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgImageSliderModule } from 'ng-image-slider';
import { SlilderComponent } from './slilder/slilder.component';
import { AssortmentComponent } from './assortment/assortment.component';
import { OrderCakeComponent } from './order-cake/order-cake.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { ShowAssortmentComponent } from './assortment/show-assortment/show-assortment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'assortment/:id', component: ShowAssortmentComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    SlilderComponent,
    AssortmentComponent,
    OrderCakeComponent,
    AboutmeComponent,
    ShowAssortmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    NgImageSliderModule,
  ],
})
export class HomeModule {}
