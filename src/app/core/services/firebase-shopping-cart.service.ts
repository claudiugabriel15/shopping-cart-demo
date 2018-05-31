import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';

import * as _ from 'lodash';

import 'rxjs/operators/take';
import 'rxjs/operator/';

@Injectable()
export class FirebaseShoppingCartService {
  cartIdChange = new BehaviorSubject<string>('');

  constructor(private db: AngularFireDatabase) {
    this.cartIdChange.next(localStorage.getItem('shoppingCartId'));
  }

  private getCartId() {
    return localStorage.getItem('shoppingCartId') || null;
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

  addItem(item: Item, cartQuantity?: number) {
    const shoppingCartId = this.getCartId();

    if (!shoppingCartId) {
      const currentDateTime = new Date().getTime();
      this.db.list('/shopping-carts').push({
        dateAdded: currentDateTime
      }).then(
        response => {
          localStorage.setItem('shoppingCartId', response.key);
          this.cartIdChange.next(response.key);
          this.updateItemQuantity(response.key, item, cartQuantity);
        }
      );
    } else {
      this.updateItemQuantity(shoppingCartId, item, cartQuantity);
    }
  }

  updateItemQuantity(shoppingCartId: string, item: Item, cartQuantity: number) {
    this.getItem(shoppingCartId, item.id).valueChanges().take(1).subscribe(
      addedItem => {
        if (!addedItem) {
          item.cartQuantity = 1;
          this.getItem(shoppingCartId, item.id).set(
            item
          );
        } else if (cartQuantity) {
          this.getItem(shoppingCartId, item.id).update({
            cartQuantity: cartQuantity
          });
        } else {
          const currentQuantity = _.get(addedItem, 'cartQuantity', 0);
          this.getItem(shoppingCartId, item.id).update({
            cartQuantity: currentQuantity + 1
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
          const currentQuantity = _.get(removedItem, 'cartQuantity', 0);

          if (currentQuantity > 1) {
            this.getItem(shoppingCartId, item.id).update({
              cartQuantity: currentQuantity - 1
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
    return this.cartIdChange.switchMap((id) => {
      return this.getItem(id, item.id).valueChanges().map(
        foundItem => {
          if (!foundItem) {
            return;
          } else {
            return _.get(foundItem, 'cartQuantity', 0);
          }
        }
      );
    });
  }

  getAllItemQuantity() {
    return this.cartIdChange.switchMap((id) => {
      return this.getFirebaseItems(id).valueChanges().map(
        items => {
          let cartQuantity = 0;
          _.each(items, (item) => cartQuantity = cartQuantity + _.get(item, 'cartQuantity', 0));

          return cartQuantity;
        }
      );
    });
  }

  getTotalCost() {
    const shoppingCartId = this.getCartId();

    return this.getFirebaseItems(shoppingCartId).valueChanges().map(
      items => {
        let cost = 0;
        _.each(items,
          (item) => cost = cost + _.get(item, 'cartQuantity', 0) * item.price
        );
        return cost;
      }
    );
  }
}
