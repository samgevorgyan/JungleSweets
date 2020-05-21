import { ShareModule } from "./../../modules/share/share.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { SearchComponent } from "./search/search.component";
import { CategoryNavComponent } from "./category-nav/category-nav.component";
import { CategorySquareComponent } from "./category-square/category-square.component";
import { NgImageSliderModule } from "ng-image-slider";

export const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    CategoryNavComponent,
    CategorySquareComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ShareModule,
    NgImageSliderModule
  ]
})
export class HomeModule {}
