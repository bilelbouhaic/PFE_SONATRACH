import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const token =localStorage.getItem('jwtToken');
       if (token){
        req=req.clone({
            setHeaders:{
                Authorization:`Bearer ${token}`
            }

        });
        

        }else{
            console.log("token not found");
       };
       return next.handle(req);
    }

}