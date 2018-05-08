import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';

import * as _ from 'lodash';

import 'rxjs/operators/take';
import 'rxjs/operator/';

@Injectable()
export class FirebaseShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private getCartId() {
    const shoppingCartId = localStorage.getItem('shoppingCartId');
    if (!shoppingCartId) {
      const currentDateTime = new Date().getTime();
      this.db.list('/shopping-carts').push({
        dateAdded: currentDateTime
      }).then(
        response => {
          localStorage.setItem('shoppingCartId', response.key);
          return response.key;
        }
      );
    } else {
      return shoppingCartId;
    }
  }

  addItem(item: Item) {
    const shoppingCartId = this.getCartId();

    this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).valueChanges().take(1).subscribe(
      addedItem => {
        if (!addedItem) {
          this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).set(
            {
              item: item,
              quantity: 1
            }
          );
        } else {
          const currentQuantity = _.get(addedItem, 'quantity', 0);
          this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).update({
            quantity: currentQuantity + 1
          });
        }
      }
    );
  }

  removeItem(item: Item) {
    const shoppingCartId = this.getCartId();

    this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).valueChanges().take(1).subscribe(
      removedItem => {
        if (!removedItem) {
          return;
        } else {
          const currentQuantity = _.get(removedItem, 'quantity', 0);

          if (currentQuantity > 1) {
            this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).update({
              quantity: currentQuantity - 1
            });
          } else {
            this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).remove();
          }
        }
      }
    );
  }

  removeMultipleItems(item: Item) {
    const shoppingCartId = this.getCartId();

    this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).remove();
  }

  getItemQuantity(item: Item) {
    const shoppingCartId = this.getCartId();

    return this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + item.id).valueChanges().map(
      foundItem => {
        if (!foundItem) {
          return;
        } else {
          return _.get(foundItem, 'quantity', 0);
        }
      }
    );
  }

  getAllItemQuantity() {
    const shoppingCartId = this.getCartId();

    return this.db.list('/shopping-carts/' + shoppingCartId + '/items').valueChanges().map(
      items => {
        let quantity = 0;
        _.each(items, (item) => quantity = quantity + _.get(item, 'quantity', 0));

        return quantity;
      }
    );
  }

  getTotalCost() {
    const shoppingCartId = this.getCartId();

    return this.db.list('/shopping-carts/' + shoppingCartId + '/items').valueChanges().map(
      items => {
        let cost = 0;
        _.each(items,
          (item) => cost = cost + _.get(item, 'quantity', 0) * item.item.price
        );
        return cost;
      }
    );
  }

  getItems() {
    const shoppingCartId = this.getCartId();

    return this.db.object('/shopping-carts/' + shoppingCartId + '/items').valueChanges().map(
      (items) => {
        const alteredItemArray: Item[] = [];
        _.each(items, (value, key) => {
          const item = new Item(value.item);
          item.id = key;
          item.quantity = value.quantity;
          alteredItemArray.push(item);
        });

        return alteredItemArray;
      }
    );
  }
}
