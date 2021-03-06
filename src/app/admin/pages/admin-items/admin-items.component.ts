import { FirebaseItemService } from '../../../core/services/services';
import { Component, ViewChild } from '@angular/core';
import { Config } from '../../../../config/config';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent {
  columns = [];
  rows: any;

  constructor(
    private firebaseItemService: FirebaseItemService,
    private config: Config,
  ) {
    this.rows = firebaseItemService.getItemList();

    this.columns = [
    {
      'name': 'name',
      'displayName': 'Name',
      'width': 30,
      'sort': true,
    },
    {
      'name': 'price',
      'displayName': 'Price',
      'width': 30,
      'sort': true,
      'currency': this.config.get('currency')
    },
    {
      'name': 'quantity',
      'displayName': 'Quantity',
      'width': 30,
      'sort': true,
    },
    {
      'name': 'edit',
      'displayName': '',
      'width': 10,
    },
  ];
  }
}
