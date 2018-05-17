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

  public removeShoppingCart() {
    const shoppingCartId = localStorage.getItem('shoppingCartId');
    if (!_.isEmpty(shoppingCartId)) {
      this.db.object('/shopping-carts/' + shoppingCartId).remove()
      .then(
        () => localStorage.removeItem('shoppingCartId'),
        (error: Error) => console.log('firebase: Can\'t remove shopping cart ', error.message)
      );
    }
  }

  private getItem(shoppingCartId: string, itemId: string) {
    return this.db.object('/shopping-carts/' + shoppingCartId + '/items/' + itemId);
  }

  private getFirebaseItems(shoppingCartId: string) {
    return this.db.object('/shopping-carts/' + shoppingCartId + '/items');
  }

  addItem(item: Item, quantity?: number) {
    const shoppingCartId = this.getCartId();

    this.getItem(shoppingCartId, item.id).valueChanges().take(1).subscribe(
      addedItem => {
        if (!addedItem) {
          item.quantity = 1;
          this.getItem(shoppingCartId, item.id).set(
            item
          );
        } else if (quantity) {
          this.getItem(shoppingCartId, item.id).update({
            quantity: quantity
          });
        } else {
          const currentQuantity = _.get(addedItem, 'quantity', 0);
          this.getItem(shoppingCartId, item.id).update({
            quantity: currentQuantity + 1
          });
        }
      }
    );
  }

  removeItem(item: Item) {
    const shoppingCartId = this.getCartId();

    this.getItem(shoppingCartId, item.id).valueChanges().take(1).subscribe(
      removedItem => {
        if (!removedItem) {
          return;
        } else {
          const currentQuantity = _.get(removedItem, 'quantity', 0);

          if (currentQuantity > 1) {
            this.getItem(shoppingCartId, item.id).update({
              quantity: currentQuantity - 1
            });
          } else {
            this.getItem(shoppingCartId, item.id).remove();
          }
        }
      }
    );
  }

  getItems() {
    const shoppingCartId = this.getCartId();

    return this.getFirebaseItems(shoppingCartId).valueChanges().map(
      (items) => {
        const alteredItemArray: Item[] = [];
        _.each(items, (value, key) => {
          const item = new Item(value);
          alteredItemArray.push(item);
        });

        return alteredItemArray;
      }
    );
  }

  removeMultipleItems(item: Item) {
    const shoppingCartId = this.getCartId();

    this.getItem(shoppingCartId, item.id).remove();
  }

  getItemQuantity(item: Item) {
    const shoppingCartId = this.getCartId();

    return this.getItem(shoppingCartId, item.id).valueChanges().map(
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

    return this.getFirebaseItems(shoppingCartId).valueChanges().map(
      items => {
        let quantity = 0;
        _.each(items, (item) => quantity = quantity + _.get(item, 'quantity', 0));

        return quantity;
      }
    );
  }

  getTotalCost() {
    const shoppingCartId = this.getCartId();

    return this.getFirebaseItems(shoppingCartId).valueChanges().map(
      items => {
        let cost = 0;
        _.each(items,
          (item) => cost = cost + _.get(item, 'quantity', 0) * item.price
        );
        return cost;
      }
    );
  }
}
