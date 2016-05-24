// login.ts
import {Component} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from '@angular/common';
import { Router } from '@angular/router-deprecated';
import {Authentication} from '../services/authentication';

@Component({
  selector: 'login',
  directives: [ FORM_DIRECTIVES, NgIf ],
  styles: [`form {margin-top: 20px;}`],
  template: require('./login.html')
})

export class Login {
  form: ControlGroup;
  error: boolean = false;
  errorMessage: string;

  constructor(fb: FormBuilder, public auth: Authentication, public router: Router) {
    this.auth.logout();
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
        (error: any) => {
          this.error = true;
          this.errorMessage = error.status === 401 ?
             "Bad username and/or password": "Unable to login"
        }
      );
  }
}
