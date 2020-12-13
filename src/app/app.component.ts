import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from './shared/services/language.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
  UrlSegment,
} from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'home';
  isAdmin = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          if (event instanceof RouterEvent) {
            this.isAdmin = event.url.includes('admin/');
          }
        });
      const languageOfBrowser = this.translate.getBrowserLang();
      const languageFromUrl = this.languageService.language;
      const lang: string = languageFromUrl || languageOfBrowser;
      this.translate.use(
        lang.includes('en') || lang.includes('am') ? lang : 'am'
      );
    }
  }
}
