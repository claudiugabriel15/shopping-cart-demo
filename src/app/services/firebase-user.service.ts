import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseUserService {
  user: firebase.User;
  public isAdmin$: any;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth) {}

  save(user: firebase.User): Promise<any> {
    return this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).then(() => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify({
        name: user.displayName,
        uid: user.uid
      }));

      this.isAdmin$ = this.db.object('/roles/admins/' + user.uid).valueChanges();

      return new Promise((resolve, reject) => {
        resolve(true);
        reject(false);
      });
    });
  }
}
