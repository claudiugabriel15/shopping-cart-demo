import { FirebaseShoppingCartService } from './../services/firebase-shopping-cart.service';
import { FirebaseUserService } from './../services/firebase-user.service';
import { LoginService } from './../services/login.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit {
  authState: any;
  loggedUser$: Observable<any>;
  isAdmin: any;
  itemQuantity$: Observable<number>;

  constructor(
    public loginService: LoginService,
    public firebaseUserService: FirebaseUserService,
    public firebaseShoppingCartService: FirebaseShoppingCartService
  ) {}

  ngOnInit() {
    this.firebaseUserService.isAdmin$.subscribe((value) => {
      this.isAdmin = value;
      return value;
    });
    this.loggedUser$ = this.loginService.userData$;
    this.itemQuantity$ = this.firebaseShoppingCartService.getAllItemQuantity();
  }

  logout() {
    this.loginService.signOut();
  }
}
