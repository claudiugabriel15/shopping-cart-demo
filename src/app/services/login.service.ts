import { FirebaseUserService } from './firebase-user.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class LoginService {
  constructor(
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private firebaseUserService: FirebaseUserService) {
  }

  public socialSignIn() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (result) => {
        this.firebaseUserService.save(result.user);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigateByUrl('');
        }
      },
      (result) => {
        this.router.navigateByUrl('login');
      }
    );
  }

  public signOut() {
    return this.angularFireAuth.auth.signOut().then(
      () => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      }
    );
  }

  get userData$() {
    return this.angularFireAuth.authState;
  }
}
