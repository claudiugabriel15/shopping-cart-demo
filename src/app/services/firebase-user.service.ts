import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseUserService {
  user: firebase.User;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {}

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).then(() => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify({
        name: user.displayName,
        uid: user.uid
      }));
    });
  }

  isAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser && currentUser.uid) {
      return this.db.object('/roles/admins/' + currentUser.uid).valueChanges();
    }

    return Observable.create(observer => {
      observer.next(false);
      observer.complete();
    });

  }
}
