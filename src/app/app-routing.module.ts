import { Location } from '@angular/common';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const distFolder = `${environment.ssrUrl}assets/i18n/configi18.json`;

export function createTranslateLoaderRouter(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient
) {
  return new LocalizeRouterHttpLoader(
    translate,
    location,
    settings,
    http,
    distFolder
  );
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: createTranslateLoaderRouter,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient],
      },
    }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
