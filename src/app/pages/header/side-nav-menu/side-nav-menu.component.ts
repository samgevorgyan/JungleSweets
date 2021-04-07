import { LanguageService } from 'src/app/shared/services/language.service';

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { languageList } from 'src/app/utils/language.list';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { User } from '../../authentication/user.interface';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss'],
})
export class SideNavMenuComponent implements OnInit {
  @Input() user;
  @Output() closeDrawer = new EventEmitter();
  languageFromUrl$ = this.languageService.languageFromUrl$;
  user$: Observable<any>;

  showLanguageList = false;
  languageList = languageList;
  isLoggedIn$: Observable<User>;
  masterClass = false;
  constructor(
    private languageService: LanguageService,
    private localize: LocalizeRouterService,
    private router: Router,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.user$ = this.user;
  }

  ngOnInit(): void {
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
  signOut() {
    this.auth.signOut();
  }
  navigateByUrl(url) {
    const urlToNavigate: any = this.localize.translateRoute(url);
    this.router.navigate([urlToNavigate]);
    this.closeDrawer.emit();
  }
  changeLanguage(lang: string) {
    this.showLanguageList = !this.showLanguageList;
    this.languageService.changeLanguage(lang);
    this.languageService.emitLanguageChange(lang);
  }

  openLanguageList() {
    if (this.masterClass) {
      return;
    }
    this.showLanguageList = !this.showLanguageList;
  }
}
