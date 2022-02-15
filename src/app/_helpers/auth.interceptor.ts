import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private token: TokenStorageService,
      private router: Router
      ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
      
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq)
    .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
              this.token.signOut();
              this.router.navigate(['login']);
              return throwError(() => error);
          } else {
              return throwError(() => error);
          }
        })
      ); 
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];