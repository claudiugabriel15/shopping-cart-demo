import { FirebaseShoppingCartService } from './../../services/firebase-shopping-cart.service';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() data: any;
  @Input() quantity: boolean;

  @Output('remove') remove = new EventEmitter<any>();
  @Output('add') add = new EventEmitter<any>();

  hasRemoveFunctionality: boolean;
  hasAddFunctionality: boolean;
  cartItemQuantity: Observable<any>;

  constructor(
    private shoppingCartService: FirebaseShoppingCartService,
    public config: Config,
  ) {}

  ngOnInit() {
    this.hasAddFunctionality = this.add.observers.length > 0 ? true : false;
    this.hasRemoveFunctionality = this.remove.observers.length > 0 ? true : false;

    if (this.quantity) {
      this.cartItemQuantity = this.shoppingCartService.getItemQuantity(this.data);
    }
  }

  removeItem() {
    this.remove.emit(this.data);
  }

  addItem() {
    this.add.emit(this.data);
  }
}
