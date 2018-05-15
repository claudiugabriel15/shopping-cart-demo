import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    ) {
      iconRegistry.addSvgIcon('google_plus_icon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/Google_Logo.svg'));
    }

  public socialSignIn() {
    this.loginService.socialSignIn();
  }
}
