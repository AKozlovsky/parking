import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppService {
  readonly LANGUAGE = 'language';

  constructor(private translateService: TranslateService) {}

  setLanguages() {
    this.translateService.addLangs(AppSettings.translate.languages);
  }

  setDefaultLanguage() {
    let language: string = AppSettings.translate.defaultLanguage;

    if (localStorage.getItem(this.LANGUAGE) !== null) {
      language = String(localStorage.getItem(this.LANGUAGE));
    } else if (
      AppSettings.translate.languages.indexOf(
        this.translateService.getBrowserLang()
      ) !== -1
    ) {
      language = this.translateService.getBrowserLang();
      localStorage.setItem(this.LANGUAGE, language);
    }

    this.translateService.setDefaultLang(language);
  }
}
