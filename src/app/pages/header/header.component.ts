import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { languageList } from 'src/app/utils/language.list';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isAdmin: boolean;
  languageList = languageList;
  languageFromUrl$ = this.languageService.languageFromUrl$;
  isMenuOpened: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      tap(console.log),
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver,
    private localize: LocalizeRouterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.languageFromUrl$.subscribe((lang: string) => {
      this.setSelectedLanguage(lang);
    });
  }

  navigateByUrl(url) {
    const urlToNavigate: any = this.localize.translateRoute(url);
    this.router.navigate([urlToNavigate]);
  }

  setSelectedLanguage(lang: string) {
    this.languageList.forEach((key) => {
      key.selected = key.name === lang;
    });
  }

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    this.languageService.emitLanguageChange(lang);
    this.setSelectedLanguage(lang);
  }

  logOut() {
    // this.store.dispatch(actions.Logout());
  }
}
