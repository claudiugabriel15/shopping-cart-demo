import { FirebaseItemService } from './firebase-item.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as _ from 'lodash';
import { Type } from '../models/type';

@Injectable()
export class FirebaseTypeService {
  constructor(
    private db: AngularFireDatabase,
    private firebaseItemService: FirebaseItemService
  ) {}

  private search(search: string, alteredTypesArray: Type[]) {
    if (search && !_.isEmpty(search.trim())) {
      _.remove(alteredTypesArray, (type) => {
        return !(type.name.toLowerCase().search(search.toLowerCase())
          || type.id.toLowerCase().search(search.toLowerCase()));
        });
    }
  }

  getTypes(search?: string) {
    return this.db.object('/types').valueChanges().map(
      (types) => {
        const alteredTypesArray = [];
        _.each(types, (value, key) => {
          const newType = new Type(value);
          newType.id = key;
          alteredTypesArray.push(newType);
        });

        this.search(search, alteredTypesArray);

        return alteredTypesArray;
      }
    );
  }

  addType(type: Type) {
    if (type.id && type.name) {
      return this.db.object(`/types/${type.id}`).set({
        name: type.name
      });
    }
  }

  removeType(type: Type) {
    return this.db.object('/types/' + type.id).remove();
  }

  isTypeInUse(id: string) {
    // query should be made server-side
    return this.firebaseItemService.getItemList().map(items => {
      return _.find(items, ['type', id]);
    });
  }

}
