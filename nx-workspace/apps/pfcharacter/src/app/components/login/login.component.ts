import { Component } from '@angular/core';
import { LoggedInUser, UserCredentials } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder) { }

  logIn() {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm.value);

    this.auth.logIn(this.loginForm.value as UserCredentials).subscribe((res: any) => {
      console.log(res);
      this.auth.setUser(res.id, res.username, res.token);
    });
  }
}
