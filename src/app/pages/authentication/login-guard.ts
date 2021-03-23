import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  constructor(
    private router: Router,
    private auth: AuthService,
    private localize: LocalizeRouterService
  ) {}

  canLoad(route: Route): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      take(1),
      map((user) => {
        if (!user) {
          const urlToNavigate: any = this.localize.translateRoute(
            '/authentication'
          );
          this.router.navigate([urlToNavigate]);
        }
        return !!user;
      })
    );
  }
}
