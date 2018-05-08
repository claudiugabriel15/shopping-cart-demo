import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private loginService: LoginService) {
  }

  public socialSignIn() {
    this.loginService.socialSignIn();
  }
}
