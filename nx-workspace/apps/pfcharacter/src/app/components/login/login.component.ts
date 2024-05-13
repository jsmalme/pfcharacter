import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalidCredentialsError = false;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private auth: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('pfCharacterEmail') !== null) {
      this.loginForm.patchValue({ email: localStorage.getItem('pfCharacterEmail') ?? '', rememberMe: true, password: '12345678' });
    }
    this.loginForm.controls.rememberMe.valueChanges.subscribe((value) => {
      if (!value) {
        localStorage.removeItem('pfCharacterEmail');
        localStorage.removeItem('refreshToken');
        this.loginForm.patchValue({ email: '', password: '' });
      }
    });
  }


  logIn() {
    if (!this.loginForm.valid && !this.loginForm.controls.rememberMe.value && localStorage.getItem('refreshToken') === null) {
      return;
    }
    if (localStorage.getItem('refreshToken') !== null && this.loginForm.controls.rememberMe.value) {
      this.auth.refreshToken(localStorage.getItem('refreshToken')).subscribe((res: any) => {
        localStorage.setItem('refreshToken', res.refresh);
        this.auth.setUser(res);
        this.router.navigate(['/characters']);
      });
    }
    else {
      this.loginForm.value.email = this.loginForm.value.email?.toLowerCase();
      this.auth.logIn(this.loginForm.value as UserCredentials).pipe(
        catchError((err) => {
          this.invalidCredentialsError = true;
          return of(err);
        })
      ).subscribe((res: any) => {
        if (res instanceof HttpErrorResponse === true) {
          return;
        }
        if (this.loginForm.controls.rememberMe.value) {
          localStorage.setItem('pfCharacterEmail', this.loginForm.value.email ?? '');
          localStorage.setItem('refreshToken', res.refresh);
        }
        else {
          localStorage.removeItem('pfCharacterEmail');
          localStorage.removeItem('refreshToken');
        }
        this.auth.setUser(res);
        this.router.navigate(['/characters']);
      });
    }
  }
}
