import { Subscription } from 'rxjs/Subscription';
import { RatingService } from './../../services/rating.service';
import { FirebaseShoppingCartService } from './../../services/firebase-shopping-cart.service';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../config/config';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() quantity: boolean;

  @Output('remove') remove = new EventEmitter<any>();
  @Output('add') add = new EventEmitter<any>();
  @Output('card-click') cardClick = new EventEmitter<any>();

  avgRating = 0;

  hasRemoveFunctionality: boolean;
  hasAddFunctionality: boolean;
  hasClickFunctionality: boolean;
  cartItemQuantity: Observable<any>;
  ratingSubscription: Subscription;

  constructor(
    private shoppingCartService: FirebaseShoppingCartService,
    public ratingService: RatingService,
    public config: Config,
  ) {}

  ngOnInit() {
    this.hasAddFunctionality = this.add.observers.length > 0 ? true : false;
    this.hasRemoveFunctionality = this.remove.observers.length > 0 ? true : false;
    this.hasClickFunctionality = this.cardClick.observers.length > 0 ? true : false;

    if (this.quantity) {
      this.cartItemQuantity = this.shoppingCartService.getItemQuantity(this.data);
    }

    this.ratingSubscription = this.ratingService.getAvgRating(this.data.id).subscribe((value) => {
      if (value && value.avgRating) {
        this.avgRating = value.avgRating;
        return;
      }
      this.avgRating = 0;
    });
  }

  ngOnDestroy(): void {
    this.ratingSubscription.unsubscribe();
  }

  removeItem() {
    this.remove.emit(this.data);
  }

  addItem() {
    this.add.emit(this.data);
  }

  clickAction() {
    this.cardClick.emit(this.data);
  }
}
