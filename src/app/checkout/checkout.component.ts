import { AlertService } from './../services/alert.service';
import { LocationService } from './../services/location.service';
import { FirebaseShoppingCartService } from '../services/firebase-shopping-cart.service';
import { FirebaseOrdersService } from './../services/firebase-orders.service';

import { Order } from './../models/order';
import { Item } from './../models/item';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnhancedTableColumn } from '../shared/enhanced-table/enhanced-table-column';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Config } from '../../config/config';

import * as _ from 'lodash';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkout = {
    shipping: {
      address: '',
      city: '',
      country: '',
      zipCode: null
    }
  };

  locationOptions = [];
  rows: Item[];
  totalCost: number;
  rowSubscription: Subscription;
  costSubscription: Subscription;
  itemQuantity$: Observable<number>;
  columns: EnhancedTableColumn[];

  constructor(
    private firebaseShoppingCartService: FirebaseShoppingCartService,
    private firebaseOrdersService: FirebaseOrdersService,
    private alertService: AlertService,
    private locationService: LocationService,
    public config: Config,
  ) {}

  ngOnInit() {
    this.rowSubscription = this.firebaseShoppingCartService.getItems().subscribe(
      (items) => this.rows = items
    );
    this.costSubscription = this.firebaseShoppingCartService.getTotalCost().subscribe(
      (totalCost) => this.totalCost = totalCost
    );

    this.itemQuantity$ = this.firebaseShoppingCartService.getAllItemQuantity();

    this.locationOptions = [
      {
        value: 'None',
        default: true
      },
      {
        value: 'Get location by IP',
        action: this.populateShippingFieldsByIP
      },
      {
        value: 'Use Account Settings',
        disabled: true
      }
    ];

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
    ];
  }

  ngOnDestroy(): void {
    this.rowSubscription.unsubscribe();
    this.costSubscription.unsubscribe();
  }

  populateShippingFieldsByIP(scope) {
    return scope.locationService.getLocationByIP()
    .then((locationData) => {
      _.set(scope, 'checkout.shipping.city', _.get(locationData, 'city'));
      _.set(scope, 'checkout.shipping.country', _.get(locationData, 'country'));
      _.set(scope, 'checkout.shipping.zipCode', _.get(locationData, 'zip'));
    });
  }

  placeOrder() {
    const newOrder = new Order({
      shipping: this.checkout.shipping,
      items: this.rows,
      cost: this.totalCost
    });

    this.firebaseOrdersService.addOrder(newOrder).then(
      () => {
        this.alertService.successAlert('Order placed successfully');
        this.firebaseShoppingCartService.removeShoppingCart();
      },
      (error: Error) => {
        this.alertService.errorAlert(error.message);
      }
    );
  }

}
