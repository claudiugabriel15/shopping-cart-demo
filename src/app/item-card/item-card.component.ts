import { Component, AfterViewInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements AfterViewInit {
  @Input('data') data: any = {};
  @Input('itemCount') itemCount: number;
  @Output('remove') remove = new EventEmitter<any>();
  @Output('add') add = new EventEmitter<any>();

  hasRemoveFunctionality: boolean;
  hasAddFunctionality: boolean;

  constructor() {
  }

  ngAfterViewInit() {
    this.hasAddFunctionality = this.add.observers.length > 0 ? true : false;
    this.hasRemoveFunctionality = this.remove.observers.length > 0 ? true : false;
  }

  removeItem() {
    this.remove.emit(this.data.id);
  }

  addItem() {
    this.add.emit(this.data.id);
  }
}
