import { HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private injector: Injector,
        private router: Router) { }
    static token = '';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${InterceptorService.token}`
        })
        req = req.clone({ headers });
        return next.handle(req).pipe(catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handleAuthError(req, next);
            }
            else {
                return throwError(() => error);
            }
        }));
    }


    private handleAuthError(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const authService = this.injector.get(AuthService);

        return authService.refreshToken().pipe(
            switchMap((res: any) => {
                InterceptorService.token = res.token;
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${InterceptorService.token}`
                    }
                });
                return next.handle(req);
            }),
            catchError((error) => {
                authService.logOut();
                this.router.navigate(['']);
                return throwError(() => error);
            })
        );
    }
}