import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
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
        const authReq = this.addToken(req);
        return next.handle(authReq).pipe(catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handleAuthError(req, next);
            }
            else {
                return throwError(() => error);
            }
        }));
    }

    private addToken(req: HttpRequest<any>): HttpRequest<any> {
        const token = InterceptorService.token;
        if (token) {
            return req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return req;
    }

    private handleAuthError(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const authService = this.injector.get(AuthService);

        return authService.refreshToken().pipe(
            switchMap((res: any) => {
                InterceptorService.token = res.token;
                const authRequest = this.addToken(req);
                return next.handle(authRequest);
            }),
            catchError((error) => {
                authService.logOut();
                this.router.navigate(['']);
                return throwError(() => error);
            })
        );
    }
}