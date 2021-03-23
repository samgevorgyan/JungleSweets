import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  async success(message) {
    await this._snackBar.open(
      this.translate.instant(message),
      this.translate.instant('COMMON.CLOSE'),
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'success-alert-snackbar',
      }
    );
  }
  async error(message) {
    await this._snackBar.open(
      this.translate.instant(message),
      this.translate.instant('COMMON.CLOSE'),
      {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        panelClass: 'error-alert-snackbar',
      }
    );
  }
}
