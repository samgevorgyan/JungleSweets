import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { observable, Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { languageList } from 'src/app/utils/language.list';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.interface';
import { MatDrawer } from '@angular/material/sidenav';
import { isPlatformBrowser } from '@angular/common';

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
  masterClass = false;
  constructor(
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver,
    private localize: LocalizeRouterService,
    private router: Router,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.languageFromUrl$.subscribe((lang: string) => {
      this.setSelectedLanguage(lang);
    });
    this.isLoggedIn$ = this.auth.isLoggedIn();
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          if (event instanceof RouterEvent) {
            this.masterClass = event.url.includes('master-class');
          }
        });
    }
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
