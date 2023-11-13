import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nx-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.auth.getPlayers1().subscribe((res: any) => { console.log(res) });
    this.auth.getPlayers2().subscribe((res: any) => { console.log(res) });
    this.auth.getPlayers3().subscribe((res: any) => { console.log(res) });
    this.auth.getPlayers4().subscribe((res: any) => { console.log(res) });
  }

  logIn() {
    if (!this.loginForm.valid) {
      return;
    }
    this

    this.auth.logIn(this.loginForm.value as UserCredentials).subscribe((res: any) => {
      console.log(res);
      this.auth.setUser(res.id, res.username, res.token);
    });
  }
}
