import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../services/alert.service';
import { FirebaseShoppingCartService } from './../services/firebase-shopping-cart.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';
import { EnhancedTableColumn } from '../shared/enhanced-table/enhanced-table-column';
import { LoginService } from '../services/login.service';

import { Config } from '../../config/config';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  columns: EnhancedTableColumn[];
  rows$: Observable<Item[]>;
  itemQuantity$: Observable<number>;
  totalCost$: Observable<number>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private firebaseShoppingCartService: FirebaseShoppingCartService,
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    public config: Config,
  ) {
    this.rows$ = this.firebaseShoppingCartService.getItems();
    this.totalCost$ = firebaseShoppingCartService.getTotalCost();
    this.itemQuantity$ = firebaseShoppingCartService.getAllItemQuantity();

    this.columns = [
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
        'currency': this.config.get('currency')
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
        'currency': this.config.get('currency')
      },
      {
        'name': 'delete',
        'displayName': '',
        'width': 10
      },
    ];
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

  placeOrder() {
    this.loginService.userData$.take(1).subscribe(
      (value) => {
        if (value) {
          console.log('order placed');
        } else {
          this.router.navigate(['/login'], { queryParams: {'returnUrl': this.route.snapshot.url}});
          this.alertService.errorAlert('You must login in order to place an order');
        }
      }
    );
  }

}
