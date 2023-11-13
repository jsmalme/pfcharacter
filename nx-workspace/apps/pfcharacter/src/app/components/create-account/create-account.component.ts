import { CanActivate, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../functions/validators';

@Component({
  selector: 'nx-workspace-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    displayName: ['']
  }, { validators: passwordMatchValidator() });

  constructor(private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
  }

  createAccount() {
    if (!this.createAccountForm.valid) {
      console.log(this.createAccountForm.controls.email.errors);
      return;
    }

    console.log(this.createAccountForm.value);
  }

  cancel() {
    this.router.navigate(['']);
  }
}
