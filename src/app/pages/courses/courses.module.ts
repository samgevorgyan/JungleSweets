import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from '../../modules/share/share.module';
import { AboutProductComponent } from './about-product/about-product.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { WhoIsForComponent } from './who-is-for/who-is-for.component';
import { EasyToEarnComponent } from './easy-to-earn/easy-to-earn.component';

export const routes: Routes = [{ path: '', component: CoursesComponent }];

@NgModule({
  declarations: [CoursesComponent, AboutProductComponent, CourseContentComponent, WhoIsForComponent, EasyToEarnComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ShareModule],
})
export class CoursesModule {}
