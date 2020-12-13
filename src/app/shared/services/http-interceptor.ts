import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpMainInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private injector: Injector
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      },
    });
    return next.handle(request).pipe(
      tap((res) => {
        console.log('from http interceptor');
      }),
      catchError((error) => {
        console.log('error from interceptr', error);
        return throwError(error);
      })
    );
  }
}
