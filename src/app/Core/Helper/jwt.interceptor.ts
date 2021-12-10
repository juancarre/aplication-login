import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Service/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
      private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const currentUserToken = this.authenticationService.currentUserTokenValue;
    const isLoggedIn = currentUserToken && currentUserToken.token;
    const isApiUrl = request.url.startsWith(`${environment.apiUrl}`);

    if (isLoggedIn && isApiUrl) {
        const changedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUserToken.token}`
            }
        });
        return next.handle(changedRequest);
    }

    return next.handle(request);
  }
}
