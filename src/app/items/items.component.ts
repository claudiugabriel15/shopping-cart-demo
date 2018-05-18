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
  searchInput: string;
  selectedTypes: string[];
  screenWidth: number;
  isHidden = true;
  isSideHidden = false;
  columnNo = 1;

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
          (items) => this.items = items
        );
        return;
      }
      this.firebaseItemService.getItemList(params.type, params.search).take(1).subscribe(
        (items) => this.items = items
      );
    });
  }

  public navigateByType(selectedOptions: any, currentlySelected: MatSelectionListChange) {
    if (currentlySelected.option.value === 'All') {
      selectedOptions.map(
        (selectedOption) => selectedOption.value !== 'All' ? selectedOption.selected = false : selectedOption.selected = true
      );
      this.router.navigate(['/'], { queryParams: { search: this.searchInput }});

      return;
    }

    _.forEach(selectedOptions, (selectedOption) => {
      if (selectedOption.value === 'All') {
        selectedOption.selected = false;
      }
    });

    this.selectedTypes = _.pull(_.map(selectedOptions, 'value'), 'All');
    this.router.navigate(['/'], { queryParams: { type: this.selectedTypes,  search: this.searchInput }});
  }

  public isTypeSelected(type: string) {
    return this.selectedTypes.indexOf(type) !== -1;
  }

  public addSearchParam() {
    const currentQueryParams = this.route.snapshot.queryParams;
    const newQueryParams = _.clone(currentQueryParams);
    newQueryParams['search'] = this.searchInput;
    this.router.navigate(['/'], { queryParams: newQueryParams });
  }

  private addToCart(item: Item) {
    this.shoppingCartService.addItem(item);
  }

  private removeFromCart(item: Item) {
    this.shoppingCartService.removeItem(item);
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
