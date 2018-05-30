import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../models/item';

import * as _ from 'lodash';

@Injectable()
export class FirebaseItemService {

  constructor(
    private db: AngularFireDatabase,
  ) {}

  private search(search: string, alteredItemsArray: Item[]) {
    if (search && !_.isEmpty(search.trim())) {
      _.remove(alteredItemsArray, (item) => !item.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

  private filter(filter: any, alteredItemsArray: Item[]) {
    if (filter && !_.isEmpty(filter.types)) {
      _.remove(alteredItemsArray, (item) => filter.types.indexOf(item.type) === -1);
    }

    if (filter && !_.isEmpty(filter.price)) {
      const fromPrice = _.get(filter, 'price.fromPrice', null);
      const toPrice = _.get(filter, 'price.toPrice', null);

      _.remove(alteredItemsArray, (item) => fromPrice ? item.price < fromPrice : false);
      _.remove(alteredItemsArray, (item) => toPrice ? item.price > toPrice : false);
    }
  }

  saveItem(id: string, values: any) {
    return this.db.object('/items/' + id).update(values);
  }

  addItem(values: any) {
    return this.db.list('/items/').push(values);
  }

  getItemList(filter?: any, search?: string, ) {
    return this.db.object('/items').valueChanges().map(
      (items) => {
        const alteredItemArray: Item[] = [];
        _.each(items, (value, key) => {
          const item = new Item({...value, id: key});
          alteredItemArray.push(item);
        });

        // filtering and searching should be done server side...
        this.filter(filter, alteredItemArray);
        this.search(search, alteredItemArray);

        if (filter && !_.isEmpty(filter.sortBy)) {
          return _.orderBy(alteredItemArray, [filter.sortBy.value], [filter.sortBy.desc ? 'desc' : 'asc']);
        }
        return alteredItemArray;
      }
    );
  }

  getItem(id: string) {
    return this.db.object('/items/' + id).valueChanges().map(
      (item) => {
        const newItem = new Item({...item, id: id});
        return newItem;
      }
    );
  }

  removeItem(id: string) {
    return this.db.object('/items/' + id).remove();
  }

  addImage(id: string, imageUrl: string) {
    return this.db.list('/items/' + id + '/images/').push(
      {
        'imageUrl': imageUrl
      }
    );
  }

  removeImage(itemId: string, imageId: string) {
    return this.db.object('/items/' + itemId + '/images/' + imageId).remove();
  }
}
