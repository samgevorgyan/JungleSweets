import { environment } from './../environments/environment';
import { ShareModule } from './modules/share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpMainInterceptor } from './shared/services/http-interceptor';
import { SideNavMenuComponent } from './pages/header/side-nav-menu/side-nav-menu.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// translate modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// AngularFire modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.ssrUrl}assets/i18n/`,
    '.json'
  );
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavMenuComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,

    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ShareModule,
    AppRoutingModule,
    LocalizeRouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpMainInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
