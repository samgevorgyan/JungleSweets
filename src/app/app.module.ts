import { ShareModule } from "./modules/share/share.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from "@angular/common/http";
import { FooterComponent } from "./pages/footer/footer.component";
import { HeaderComponent } from "./pages/header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomMaterialModule } from "./modules/custom-material/custom-material.module";
import { CustomFontAwesomeModule } from "./modules/custom-font-awesome/custom-font-awesome.module";
import { SideNavMenuComponent } from "./pages/header/side-nav-menu/side-nav-menu.component";
import { HomeComponent } from "./pages/home/home.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// translate modules
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { LocalizeRouterModule } from "@gilsdav/ngx-translate-router";
import { routes } from "./pages/home/home.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
