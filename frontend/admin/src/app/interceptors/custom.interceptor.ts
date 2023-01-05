import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { GlobalService } from '../services/global/global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request;

    if (request.url !== '/api/user/login') {
      if (!this.globalService.jwtToken) {
        this.globalService.setToken(localStorage.getItem('token'));
      }

      req = request.clone({
        setHeaders: {
          authorization: this.globalService.jwtToken,
        },
      });
    }

    return next.handle(req).pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    const { statusCode, message } = error.error;

    this.snackBar.open(`Error Code: ${statusCode}: ${message}`);

    switch (statusCode) {
      case 401:
        localStorage.removeItem('token');
        this.router.navigateByUrl('login');
        break;
      default:
        break;
    }

    return throwError(() => new Error(message));
  }
}
