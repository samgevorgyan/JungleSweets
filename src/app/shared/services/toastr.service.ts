import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  async success(message, duration = 5000) {
    await this._snackBar.open(
      this.translate.instant(message),
      this.translate.instant('COMMON.CLOSE'),
      {
        duration,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'success-alert-snackbar',
      }
    );
  }
  async error(message, duration = 5000) {
    await this._snackBar.open(
      this.translate.instant(message),
      this.translate.instant('COMMON.CLOSE'),
      {
        duration,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'error-alert-snackbar',
      }
    );
  }
}
