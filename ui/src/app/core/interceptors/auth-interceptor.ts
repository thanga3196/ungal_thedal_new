import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return this.handleRequest(next, req)
    }
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return this.handleRequest(next, clonedReq)
  }

  handleRequest(next: HttpHandler, req: HttpRequest<any>) {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.router.navigate(['login'], {
          queryParams: {
            requestUrl: this.router.routerState.snapshot.url
          }
        })
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
