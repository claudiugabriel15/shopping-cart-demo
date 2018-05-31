import { Component } from '@angular/core';
import { Config } from '../../../../config/config';
import { FirebaseOrdersService } from '../../../core/services/services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  columns = [];
  rows: any;

  constructor(
    private firebaseOrdersService: FirebaseOrdersService,
    private config: Config,
  ) {
    this.rows = firebaseOrdersService.getOrdersList();

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
      'name': 'view',
      'displayName': 'View Details',
      'width': 10,
    }
  ];
  }
}
