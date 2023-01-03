import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global/global.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}

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

    return next.handle(req);
  }
}
