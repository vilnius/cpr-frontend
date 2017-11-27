import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'login',
  styles: [`form {margin-top: 20px;}`],
  templateUrl: 'login.html'
})
export class LoginComponent {
  public details = { username: '', password: '' };
  public error: boolean = false;
  public errorMessage: string;

  constructor(public auth: AuthService, public router: Router) {
    this.auth.logout();
  }

  public onSubmit() {
    this.auth.login(this.details.username, this.details.password)
      .subscribe(
        () => this.router.navigate(['']),
        (error: any) => {
          console.log(error);
          this.error = true;
          this.errorMessage = error.status === 401 ?
             'Bad username and/or password' : 'Unable to login';
        }
      );
  }
}
