import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private loaderService : LoaderService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.params.has('skipAlert') && request.params.get('skipAlert') === 'true') {
      const clonedRequest = request.clone({
        params: request.params.delete('skipAlert')
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
         this.loaderService.createToast('success', 'Respose successful',1500);
        }
      }),
      catchError((error: HttpErrorResponse) => {
       this.loaderService.createToast('error', `Error : ${error.error.error}`,2000);
        return throwError(error);
      })
    );
  }
}
