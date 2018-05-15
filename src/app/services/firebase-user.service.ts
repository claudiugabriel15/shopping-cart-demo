import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import * as _ from 'lodash';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class FirebaseUserService {
  user: firebase.User;
  public isAdmin$: any;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {
    this.isAdmin$ = new BehaviorSubject(() => {
      return this.isAdmin();
    });
  }

  save(user: firebase.User): Promise<any> {
    return this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    }).then(() => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify({
        name: user.displayName,
        uid: user.uid,
        email: user.email
      }));

      this.updateIsAdmin(user.email);

      return new Promise((resolve, reject) => {
        resolve(true);
        reject(false);
      });
    });
  }

  private isAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = _.get(user, 'email', null);

    return this.db.list('/roles/admins').valueChanges()
    .map(
      (result) => result.indexOf(userEmail) > 0
    ).catch((error: any) => {
      return Observable.of(false);
    });
  }

  private updateIsAdmin(email) {
    return this.db.list('/roles/admins').valueChanges()
    .map(
      (result) => this.isAdmin$.next(result.indexOf(email) > 0)
    ).catch((error: any) => {
      this.isAdmin$.next(false);
      return Observable.of(false);
    }).subscribe();
  }
}
