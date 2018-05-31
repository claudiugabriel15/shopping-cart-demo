import {
  SidebarService,
  FirebaseShoppingCartService,
  FirebaseUserService,
  LoginService,
} from '../../../core/services/services';
import { Router } from '@angular/router';
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
    public firebaseShoppingCartService: FirebaseShoppingCartService,
    public router: Router,
    public sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    // this.firebaseUserService.isAdmin$.subscribe((value) => {
    //   this.isAdmin = value;
    //   return value;
    // });
    this.isAdmin = true;
    this.loggedUser$ = this.loginService.userData$;
    this.itemQuantity$ = this.firebaseShoppingCartService.getAllItemQuantity();
  }

  logout() {
    this.loginService.signOut();
  }
}
