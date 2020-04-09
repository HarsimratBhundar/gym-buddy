import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    getString,
} from "tns-core-modules/application-settings";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = getString("user") ? JSON.parse(getString("user")) : undefined;
    if (user && user.token) {
      request = request.clone({
        url: request.url,
        setHeaders: {
          Authorization: `Token ${user.token}`
        }
      });
    }
    return next.handle(request);
  }
}