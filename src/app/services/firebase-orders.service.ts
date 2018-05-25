import { Order } from './../models/order';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as _ from 'lodash';

@Injectable()
export class FirebaseOrdersService {
  locationOptions = [];

  constructor(
    private db: AngularFireDatabase) {}

  private getStoredUserId() {
    const user = JSON.parse(localStorage.getItem('user'));

    return _.get(user, 'uid', null);
  }

  private search(search: string, alteredOrdersArray: any[]) {
    if (search && !_.isEmpty(search.trim())) {
      _.remove(alteredOrdersArray, (order) => {
        return order.cost.toLowerCase().search(search.toLowerCase())
          || order.shipDate.toLowerCase().search(search.toLowerCase())
          || order.initDate.toLowerCase().search(search.toLowerCase());
      });
    }
  }

  addOrder(order: Order) {
    const uid = this.getStoredUserId();
    order.userId = uid;

    return this.db.list(`/orders/${uid}/`).push(order);
  }

  getOrdersList(search?: string) {
    const uid = this.getStoredUserId();

    return this.db.object(`/orders/${uid}/`).valueChanges().map(
      (orders) => {
        const alteredOrdersArray = [];
        _.each(orders, (value, key) => {
          const newOrder = new Order({...value, id: key });
          alteredOrdersArray.push(newOrder);
        });

        // filtering should be done server side...
        this.search(search, alteredOrdersArray);

        return alteredOrdersArray;
      }
    );
  }

  getAllOrdersList(search?: string) {
    return this.db.list(`/orders/`).valueChanges().map(
      (orders) => {
        const alteredOrdersArray = [];
        _.each(orders, (value, key) => {
          _.each(value, (orderValue, orderKey) => {
            const newOrder = new Order({...orderValue, id: orderKey });
            alteredOrdersArray.push(newOrder);
          });
        });

        // filtering should be done server side...
        this.search(search, alteredOrdersArray);

        return alteredOrdersArray;
      }
    );
  }

  getOrderDetails(id: string) {
    const uid = this.getStoredUserId();

    return this.db.object(`/orders/${uid}/${id}`).valueChanges();
  }

  getAdminOrderDetails(id: string) {
    return this.db.list(`/orders/`, ref => ref.orderByKey()).valueChanges().map(
      (values) => {
        let returnedOrder = new Order({});

        _.each(values, (orders) => {
          return _.each(orders, (order, key) => {
            if (key === id) {
              returnedOrder =  new Order({...order, id: key});
              return;
            }
          });
        });

        return returnedOrder;
      }
    );
  }

  setShipped(order: Order) {
    return this.db.object(`/orders/${order.userId}/${order.id}`).update({
      'shipped': true,
      'shipDate': Date.now()
    }).then(() => {

      // should update server-side
      _.each(order.items, (item) => {
        this.db.object(`/items/${item.id}`).update({
          'quantity': item.quantity - item.cartQuantity
        });
      });
    });
  }
}
