import { Router, ActivatedRoute } from '@angular/router';
import {
  AlertService,
  FirebaseShoppingCartService,
  LoginService,
} from '../../../core/services/services';
import {  } from './../services/firebase-shopping-cart.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Item } from '../../../core/models/item';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../../config/config';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  columns = [];
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
        'name': 'cartQuantity',
        'displayName': 'Quantity',
        'width': 20,
        'sort': true,
        'editable': true
      },
      {
        'name': 'total_price',
        'displayName': 'Total Price',
        'expression': {
          'variables': ['price', 'cartQuantity'],
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
    this.firebaseShoppingCartService.addItem(item, item.cartQuantity);
  }

  removeItem(item: Item) {
    this.firebaseShoppingCartService.removeItem(item);
  }

  clearAll(item: Item) {
    this.firebaseShoppingCartService.removeMultipleItems(item);
  }

  goToItemPage(item: Item) {
    this.router.navigateByUrl(`items/${item.id}`);
  }
}
