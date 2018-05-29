import { FirebaseShoppingCartService } from './../services/firebase-shopping-cart.service';
import { FirebaseItemService } from './../services/firebase-item.service';
import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/operators/take';
import * as _ from 'lodash';
import { Item } from '../models/item';
import { FirebaseTypeService } from '../services/firebase-type.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})

export class ItemsComponent implements OnInit {
  items: any;
  types: Observable<any[]>;
  filter = {
    price: {
      fromPrice: '',
      toPrice: ''
    },
    sortBy: {
      value: '',
      desc: false
    },
    types: []
  };
  sortCriteria = [
    {
      value: 'price',
      label: 'Price'
    },
    {
      value: 'quantity',
      label: 'Stock'
    }
  ];
  selectedTypes: string[];
  searchInput: string;
  screenWidth: number;
  isHidden = true;
  isSideHidden = false;
  columnNo = 1;
  loaded = false;

  @ViewChild('gridList') gridListElem: ElementRef;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.screenWidth = event.target.innerWidth;
    this.setColumnNo();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private firebaseItemService: FirebaseItemService,
    private firebaseTypeService: FirebaseTypeService,
    private shoppingCartService: FirebaseShoppingCartService) {
  }

  ngOnInit() {
    this.types = this.firebaseTypeService.getTypes();

    // get params in order to update UI
    const queryParams = this.route.snapshot.queryParams;
    this.searchInput = queryParams.search || '';
    this.selectedTypes = queryParams.type || ['All'];

    // update data according to param change
    this.subscribeToParamChanges();

    this.screenWidth = window.innerWidth;
    this.setColumnNo();
  }

  private subscribeToParamChanges() {
    this.route.queryParams.subscribe((params) => {
      if (!params) {
        this.firebaseItemService.getItemList().take(1).subscribe(
          (items) => {
            this.items = items;
            this.loaded = true;
            this.setColumnNo();
          }
        );
        return;
      }
      this.filter.types = params.type;
      this.filter.sortBy.value = params.sort;
      this.filter.sortBy.desc = (params.desc === 'true');

      this.firebaseItemService.getItemList(this.filter, params.search).take(1).subscribe(
        (items) => {
          this.items = items;
          this.loaded = true;
          this.setColumnNo();
        }
      );
    });
  }

  public navigateByType(selectedOptions: any, currentlySelected: MatSelectionListChange) {
    if (currentlySelected.option.value === 'All') {
      selectedOptions.map(
        (selectedOption) => selectedOption.value !== 'All' ? selectedOption.selected = false : selectedOption.selected = true
      );
      this.router.navigate(['items'], { queryParams: { search: this.searchInput }});

      return;
    }

    _.forEach(selectedOptions, (selectedOption) => {
      if (selectedOption.value === 'All') {
        selectedOption.selected = false;
      }
    });

    this.selectedTypes = _.pull(_.map(selectedOptions, 'value'), 'All');
    this.router.navigate(['items'], { queryParams: { type: this.selectedTypes,  search: this.searchInput }});
  }

  public isTypeSelected(type: string) {
    return this.selectedTypes.indexOf(type) !== -1;
  }

  public addSearchParam() {
    const newQueryParams = this.getQueryParams();
    newQueryParams['search'] = this.searchInput;
    this.router.navigate(['items'], { queryParams: newQueryParams });
  }

  public updateFromPriceParam() {
    const newQueryParams = this.getQueryParams();
    newQueryParams['fromPrice'] = this.filter.price.fromPrice;
    this.router.navigate(['items'], { queryParams: newQueryParams });
  }

  public updateToPriceParam() {
    const newQueryParams = this.getQueryParams();
    newQueryParams['toPrice'] = this.filter.price.toPrice;
    this.router.navigate(['items'], { queryParams: newQueryParams });
  }

  public updateSortParam() {
    const newQueryParams = this.getQueryParams();
    newQueryParams['sort'] = this.filter.sortBy.value;
    this.router.navigate(['items'], { queryParams: newQueryParams });
  }

  public updateSortDescParam() {
    const newQueryParams = this.getQueryParams();
    newQueryParams['desc'] = this.filter.sortBy.desc;
    this.router.navigate(['items'], { queryParams: newQueryParams });
  }

  private getQueryParams() {
    const currentQueryParams = this.route.snapshot.queryParams;
    return _.clone(currentQueryParams);
  }

  private addToCart(item: Item) {
    this.shoppingCartService.addItem(item);
  }

  private removeFromCart(item: Item) {
    this.shoppingCartService.removeItem(item);
  }

  private goToItemPage(item: Item) {
    this.router.navigateByUrl(`items/${item.id}`);
  }

  private setColumnNo() {
    setTimeout(() => {
      const elementWidth = _.get(this, 'gridListElem._element.nativeElement.offsetWidth', null);
      if (elementWidth) {
        this.columnNo =  Math.floor(elementWidth / 450);
      }
    });
  }
}
