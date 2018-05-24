import { Config } from './../../../config/config';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseOrdersService } from './../../services/firebase-orders.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  data: Order;
  itemsColumns = [];

  orderDetailsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseOrdersService: FirebaseOrdersService,
    public config: Config
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id || null;

    if (id) {
      this.getOrderData(id);
    }

    this.itemsColumns = [
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
    this.orderDetailsSubscription.unsubscribe();
  }

  getOrderData(id: string) {
    this.orderDetailsSubscription = this.firebaseOrdersService.getOrderDetails(id).take(1).subscribe((value) => {
      this.data = new Order(value);
    });
  }

}
