import { Order } from './../models/order';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as _ from 'lodash';

@Injectable()
export class FirebaseOrdersService {
  locationOptions = [];

  constructor(
    private db: AngularFireDatabase) {}


  addOrder(order: Order) {
    const uid = this.getStoredUserId();
    return this.db.list(`/orders/${uid}/`).push(order);
  }

  getOrdersList() {
    const uid = this.getStoredUserId();
    return this.db.list(`/orders/${uid}/`).valueChanges();
  }

  private getStoredUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    return _.get(user, 'uid', null);
  }
}
