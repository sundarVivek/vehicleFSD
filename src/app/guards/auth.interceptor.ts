import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AddService } from '../add.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private addService:AddService, private route:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken= this.addService.getToken();
    if(localToken){
      request=request.clone({
        setHeaders:{
         Authorization:'Bearer ${localToken}'
        }
       })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Unauthorized or forbidden access, redirect to login page
          this.route.navigate(['/login']);
        }
        return throwError(error);
      })
    );;
  }
}
