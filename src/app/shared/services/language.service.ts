import { Injectable } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: string;

  private languageFromUrl = new BehaviorSubject<string>('');
  public languageFromUrl$ = this.languageFromUrl.asObservable();

  constructor(
    public localizeService: LocalizeRouterService,
    private translate: TranslateService
  ) {
    this.setLanguageFromUrl();
  }

  setLanguageFromUrl() {
    this.language = this.localizeService.parser.currentLang
      ? this.localizeService.parser.currentLang
      : this.localizeService.parser.defaultLang;
    this.emitLanguageChange(this.language);
  }

  emitLanguageChange(lang: string) {
    this.languageFromUrl.next(lang);
  }

  changeLanguage(lang) {
    this.translate.use(lang);
    this.localizeService.changeLanguage(lang);
  }
}
