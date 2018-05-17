import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import { Item } from '../models/item';

@Injectable()
export class FirebaseItemService {

  constructor(
    private db: AngularFireDatabase) {}

  saveItem(id: string, values: any) {
    return this.db.object('/items/' + id).update(values);
  }

  addItem(values: any) {
    return this.db.list('/items/').push(values);
  }

  getItemList(types?: string[], search?: string) {
    return this.db.object('/items').valueChanges().map(
      (items) => {
        const alteredItemArray: Item[] = [];
        _.each(items, (value, key) => {
          const item = new Item({...value, id: key});
          alteredItemArray.push(item);
        });

        // filtering should be done server side...

        if (types) {
          _.remove(alteredItemArray, (item) => {
            return types.indexOf(item.type) === -1;
          });
        }

        if (search && search.trim()) {
          _.remove(alteredItemArray, (item) => {
            return item.name.toLowerCase().search(search.toLowerCase());
          });
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
}
