import { CanActivate, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../functions/validators';
import { AuthService } from '../../services/auth.service';
import { UserCreation } from '../../models/auth';

@Component({
  selector: 'nx-workspace-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    displayName: ['']
  }, { validators: passwordMatchValidator() });

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService) { }


  createAccount() {
    if (!this.createAccountForm.valid) {
      return;
    }

    const user: UserCreation = {
      email: this.createAccountForm.controls?.email?.value ?? '',
      password: this.createAccountForm.controls.password.value ?? '',
      username: this.createAccountForm.controls.displayName.value ?? ''
    };

    this.auth.createUser(user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['']);
  }
}
