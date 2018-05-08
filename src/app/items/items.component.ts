import { FirebaseItemService } from './../services/firebase-item.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/operators/take';
import * as _ from 'lodash';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items: any;
  types: Observable<any[]>;
  searchInput: string;
  selectedTypes: string[];
  itemCount = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private firebaseItemService: FirebaseItemService) {
      this.types = this.firebaseItemService.getTypes();

      // get params in order to update UI
      this.searchInput = this.route.snapshot.queryParams.search || '';
      this.selectedTypes = this.route.snapshot.queryParams.type || ['All'];

      // update data according to param change
      this.route.queryParams.subscribe((params) => {
        if (!params) {
          this.firebaseItemService.getItemList().take(1).subscribe(
            (items) => this.items = items
          );
          return;
        }
        this.firebaseItemService.getItemList(params.type, params.search).subscribe(
          (items) => this.items = items
        );
      });
  }

  navigateByType(selectedOptions: any, currentlySelected: MatSelectionListChange) {
    if (currentlySelected.option.value === 'All') {
      _.forEach(selectedOptions, (selectedOption) => {
        if (selectedOption.value !== 'All') {
          selectedOption.selected = false;
        }
      });

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

  isTypeSelected(type: string) {
    return this.selectedTypes.indexOf(type) !== -1;
  }

  addSearchParam() {
    const currentQueryParams = this.route.snapshot.queryParams;
    const newQueryParams = _.clone(currentQueryParams);
    newQueryParams['search'] = this.searchInput;
    this.router.navigate(['/'], { queryParams: newQueryParams });
  }

  addToCart(id: string) {
    // this.itemCount++;

    const shoppingCartId = localStorage.getItem('shoppingCartId');
    if (!shoppingCartId) {

    }
  }

  removeFromCart(id: string) {
    this.itemCount--;
  }
}
