import { LanguageService } from 'src/app/shared/services/language.service';

import { Component, Input, OnInit } from '@angular/core';
import { languageList } from 'src/app/utils/language.list';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss'],
})
export class SideNavMenuComponent implements OnInit {
  @Input() user;
  languageFromUrl$ = this.languageService.languageFromUrl$;
  user$: Observable<any>;
  showConfigMenu = false;
  showLanguageList = false;
  languageList = languageList;

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.user$ = this.user;
  }

  ngOnInit(): void {}

  openConfigMenu() {
    this.showConfigMenu = !this.showConfigMenu;
  }

  openLanguageList() {
    this.showLanguageList = !this.showLanguageList;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.languageService.changeLanguage(lang);
    this.languageService.emitLanguageChange(lang);
  }
}
