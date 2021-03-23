import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

import { observable, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { languageList } from 'src/app/utils/language.list';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.interface';

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

  isLoggedIn$: Observable<User>;

  constructor(
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver,
    private localize: LocalizeRouterService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.languageFromUrl$.subscribe((lang: string) => {
      this.setSelectedLanguage(lang);
    });
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  navigateByUrl(url) {
    const urlToNavigate: any = this.localize.translateRoute(url);
    this.router.navigate([urlToNavigate]);
  }

  signOut() {
    this.auth.signOut();
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
