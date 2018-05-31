import {
  FirebaseShoppingCartService,
  FirebaseTypeService,
  RatingService,
  AlertService,
  FirebaseItemService } from '../../../core/services/services';

import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Item } from '../../../core/models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../../../config/config';

import * as _ from 'lodash';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  data: Item = new Item({});
  rating: Observable<any>;
  userRating: Observable<any>;
  typeName: Observable<string>;
  items: Observable<any>;
  loaded = false;
  columnNo = 1;

  @ViewChild('gridList') gridListElem: ElementRef;
  @ViewChild('itemDescription') itemDescriptionElem: ElementRef;
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.setColumnNo();
  }

  constructor(
    private firebaseItemService: FirebaseItemService,
    private alertService: AlertService,
    private ratingService: RatingService,
    private firebaseTypeService: FirebaseTypeService,
    private config: Config,
    private shoppingCartService: FirebaseShoppingCartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => this.getItemData(_.get(params, 'params.id', null))
    );
  }

  private addToCart() {
    this.shoppingCartService.addItem(this.data);
  }

  private setColumnNo() {
    setTimeout(() => {
      const elementWidth = _.get(this, 'gridListElem._element.nativeElement.offsetWidth', null);
      if (elementWidth) {
        this.columnNo =  Math.floor(elementWidth / 350);
      }
    });
  }

  private scrollToTop() {
    const element = _.get(this, 'itemDescriptionElem.nativeElement', null);
    if (element) {
      element.scrollIntoView();
    }
  }

  private setObservables(itemData: Item) {
    this.typeName = this.firebaseTypeService.getTypeName(itemData.type);
    this.rating = this.ratingService.getRating(itemData.id);
    this.userRating = this.ratingService.getUserRating(itemData.id);
    this.items = this.firebaseItemService.getItemList({
      'types': [this.data.type]
    }).map(
      // exclude the current item
      (items) => {
        _.remove(items, ['id', itemData.id]);
        return items;
      }
    ).take(1);
  }

  getItemData(id: string) {
    this.firebaseItemService.getItem(id).take(1).subscribe(
      (itemData) => {
        this.data = itemData;
        this.loaded = true;
        this.setObservables(itemData);
        this.setColumnNo();
        this.scrollToTop();
      },
      (error: Error) => {
        this.alertService.errorAlert(error.message);
        this.loaded = true;
      }
    );
  }

  updateRating(value) {
    this.ratingService.updateRating(this.data.id, value).then(
      () => {
        this.ratingService.updateAvgRating(this.data.id);
        this.alertService.successAlert('Rating updated successfully');
      },
      () => this.alertService.errorAlert('You must login in order take this action')
    );
  }

  goToItemPage(item: Item) {
    this.router.navigateByUrl(`/items/${item.id}`);
  }
}
