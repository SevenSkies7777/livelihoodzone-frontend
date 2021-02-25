// tslint:disable:whitespace
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class AuthInterceptor implements HttpInterceptor {
    CREDZ_STORE = 'auth.config.credz';

    constructor(private router: Router) {
    }

    handleError(error: HttpErrorResponse) {
        if (error.status === 401) {
            setTimeout(() => {
                this.router.navigate(['/auth/signin'], { queryParams: { logout: 'is_logged_out' } });
            }, 100);
        }
        return throwError(error);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token:any = localStorage.getItem(this.CREDZ_STORE);
        if (token) {
            token = JSON.parse(token);
            const cloneReq = request.clone({
                headers: request.headers.set(
                    'Authorization', `Token ${token.access_token}`),
                // withCredentials: true,
            });
            return next.handle(cloneReq)
            .pipe(catchError(err => this.handleError(err))
            );
        }
        return next.handle(request);
    }
}
