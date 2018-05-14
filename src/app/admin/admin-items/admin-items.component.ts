import { FirebaseItemService } from './../../services/firebase-item.service';
import { Component, ViewChild } from '@angular/core';
import { EnhancedTableColumn } from '../../shared/enhanced-table/enhanced-table-column';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent {
  columns: EnhancedTableColumn[] = [
    {
      'name': 'id',
      'displayName': 'Id',
      'width': 35,
      'sort': true,
    },
    {
      'name': 'name',
      'displayName': 'Name',
      'width': 35,
      'sort': true,
    },
    {
      'name': 'price',
      'displayName': 'Price',
      'width': 20,
      'sort': true,
    },
    {
      'name': 'edit',
      'displayName': '',
      'width': 10,
    },
  ];
  rows: any;

  constructor(
    private firebaseItemService: FirebaseItemService
  ) {
    this.rows = firebaseItemService.getItemList();
  }
}
