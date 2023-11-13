import { Component } from '@angular/core';
import { UserCredentials } from '../../models/auth';
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
    this

    this.auth.logIn(this.loginForm.value as UserCredentials).subscribe((res: any) => {
      this.auth.setUser(res.id, res.username, res.token);
    });
  }
}
