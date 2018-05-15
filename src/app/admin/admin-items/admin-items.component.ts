import { FirebaseItemService } from './../../services/firebase-item.service';
import { Component, ViewChild } from '@angular/core';
import { EnhancedTableColumn } from '../../shared/enhanced-table/enhanced-table-column';
import { Config } from '../../../config/config';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent {
  columns: EnhancedTableColumn[] = [];
  rows: any;

  constructor(
    private firebaseItemService: FirebaseItemService,
    private config: Config,
  ) {
    this.rows = firebaseItemService.getItemList();

    this.columns = [
    {
      'name': 'id',
      'displayName': 'Id',
      'width': 30,
      'sort': true,
    },
    {
      'name': 'name',
      'displayName': 'Name',
      'width': 30,
      'sort': true,
    },
    {
      'name': 'price',
      'displayName': 'Price',
      'width': 15,
      'sort': true,
      'currency': this.config.get('currency')
    },
    {
      'name': 'quantity',
      'displayName': 'Quantity',
      'width': 15,
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
