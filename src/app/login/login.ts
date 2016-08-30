import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Authentication} from '../services/authentication';

export class LoginDetails {
  constructor(
    public username: string = "",
    public password: string = "",
    public remember?: boolean
  ) {  }
}

@Component({
  selector: 'login',
  styles: [`form {margin-top: 20px;}`],
  template: require('./login.html')
})
export class Login {
  details = new LoginDetails();
  error: boolean = false;
  errorMessage: string;

  constructor(public auth: Authentication, public router: Router) {
  }

  onSubmit() {
    this.auth.login(this.details.username, this.details.password)
      .subscribe(
        (token: any) => this.router.navigate(['']),
        (error: any) => {
          this.error = true;
          this.errorMessage = error.status === 401 ?
             "Bad username and/or password": "Unable to login"
        }
      );
  }
}
