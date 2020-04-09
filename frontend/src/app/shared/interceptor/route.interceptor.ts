import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RouteInterceptor implements HttpInterceptor {

   apiPath = "https://gym-buddy-backend-api.herokuapp.com"

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
        url: this.apiPath + request.url,
      });

      return next.handle(request);

    }
}