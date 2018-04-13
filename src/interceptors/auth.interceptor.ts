import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    //
    // if(req.method === 'POST') {
    //   const authReq = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + req.body.token)
    //   });
    //   authReq.body = {};
    //   console.log('authReq POST sent: ' + JSON.stringify(authReq));
    //   return next.handle(authReq);
    // } else {
    // console.log('request: ' + JSON.stringify(req.headers));
      return next.handle(req);
    // }

  }
}
