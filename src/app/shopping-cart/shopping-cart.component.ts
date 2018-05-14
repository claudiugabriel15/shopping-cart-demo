import { FirebaseShoppingCartService } from './../services/firebase-shopping-cart.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';
import { EnhancedTableColumn } from '../shared/enhanced-table/enhanced-table-column';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  columns: EnhancedTableColumn[] = [
    {
      'name': 'image',
      'displayName': '',
      'width': 20,
    },
    {
      'name': 'name',
      'displayName': 'Name',
      'width': 20,
      'sort': true,
    },
    {
      'name': 'price',
      'displayName': 'Price',
      'width': 20,
      'sort': true,
    },
    {
      'name': 'quantity',
      'displayName': 'Quantity',
      'width': 20,
      'sort': true,
      'editable': true
    },
    {
      'name': 'total_price',
      'displayName': 'Total Price',
      'expression': {
        'variables': ['price', 'quantity'],
        'operation': '*'
      },
      'width': 10,
    },
    {
      'name': 'delete',
      'displayName': '',
      'width': 10
    },
  ];
  rows: any;

  totalCost: Observable<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private firebaseShoppingCartService: FirebaseShoppingCartService) {
    this.rows = this.firebaseShoppingCartService.getItems();
    this.totalCost = firebaseShoppingCartService.getTotalCost();
  }

  addItem(item: Item) {
    this.firebaseShoppingCartService.addItem(item, item.quantity);
  }

  removeItem(item: Item) {
    this.firebaseShoppingCartService.removeItem(item);
  }

  clearAll(item: Item) {
    this.firebaseShoppingCartService.removeMultipleItems(item);
  }
}
