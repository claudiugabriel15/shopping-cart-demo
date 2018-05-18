import { Component, OnInit } from '@angular/core';
import { FirebaseOrdersService } from '../../services/firebase-orders.service';
import { Config } from '../../../config/config';
import { EnhancedTableColumn } from '../../shared/enhanced-table/enhanced-table-column';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  columns: EnhancedTableColumn[] = [];
  rows: any;

  constructor(
    private firebaseOrdersService: FirebaseOrdersService,
    private config: Config,
  ) {
    this.rows = firebaseOrdersService.getAllOrdersList();

    this.columns = [
    {
      'name': 'initDate',
      'displayName': 'Date placed',
      'width': 30,
      'sort': true,
      'date': this.config.get('dateFormat')
    },
    {
      'name': 'shipDate',
      'displayName': 'Date Shipped',
      'width': 30,
      'sort': true,
      'date': this.config.get('dateFormat')
    },
    {
      'name': 'cost',
      'displayName': 'Cost',
      'width': 30,
      'sort': true,
      'currency': this.config.get('currency')
    },
    {
      'name': 'edit',
      'displayName': 'Edit',
      'width': 10,
    }
  ];
  }

}
