// login.ts
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import {Router} from 'angular2/router';
import {Authentication} from '../services/authentication';

@Component({
  selector: 'login',
  directives: [ FORM_DIRECTIVES, NgIf ],
  styles: [`form {margin-top: 20px;}`],
  template: `
    <form [ngFormModel]="form">
      <span>Use: admin/admin</span>
      <div>
        <label for="username">Username</label>
        <input type="text" ngControl="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" ngControl="password">
      </div>
      <div class="form-group">
        <div *ngIf="error">Check your password</div>
        <button type="submit" [disabled]="!form.valid" (click)="onSubmit($event, form.value)">Login</button>
      </div>
    </form>
  `
})

export class Login {
  form: ControlGroup;
  error: boolean = false;
  constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
    this.form = fb.group({
      username:  ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  onSubmit(event: any, value: any) {
    event.preventDefault();
    event.stopPropagation();
    this.auth.login(value.username, value.password)
      .subscribe(
        (token: any) => this.router.navigate(['Index']),
        () => { this.error = true; }
      );
  }
}
