import { LanguageService } from 'src/app/shared/services/language.service';

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { languageList } from 'src/app/utils/language.list';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { User } from '../../authentication/user.interface';

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
  constructor(
    private languageService: LanguageService,
    private localize: LocalizeRouterService,
    private router: Router,
    private auth: AuthService
  ) {
    this.user$ = this.user;
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn();
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
    this.showLanguageList = !this.showLanguageList;
  }
}
