import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.addToken(req, this.auth.accessToken);
    return next.handle(authReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // If already refreshing, wait for it to finish then retry
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            return this.auth.refresh().pipe(
              switchMap(() => {
                const retryReq = this.addToken(req, this.auth.accessToken);
                return next.handle(retryReq);
              }),
              finalize(() => { this.isRefreshing = false; })
            );
          } else {
            // If already refreshing, return error (or queue requests if you implement)
            return throwError(() => err);
          }
        }
        return throwError(() => err);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    if (!token) return req;
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
