import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import * as _ from 'lodash';

@Injectable()
export class FirebaseUserService {
  user: firebase.User;
  public isAdmin$: Subject<any>;

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth
  ) {
    this.isAdmin$ = new Subject();
    this.isAdmin().subscribe();
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

      this.isAdmin().subscribe();

      return new Promise((resolve, reject) => {
        resolve(true);
        reject(false);
      });
    });
  }

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = _.get(user, 'email', null);

    if (!userEmail) {
      this.isAdmin$.next(false);
      return Observable.of(false);
    }

    return this.db.list('/roles/admins').valueChanges()
    .map(
      (result) => {
        const val = result.indexOf(userEmail) >= 0;
        this.isAdmin$.next(val);
        return val;
      }
    ).catch((error: any) => {
      this.isAdmin$.next(false);
      return Observable.of(false);
    });
  }
}
