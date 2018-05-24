import { Rating } from './../../models/rating';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit, OnChanges {
  @Input() readonly = true;
  // tslint:disable-next-line:no-input-rename
  @Input('rating') ratingObj: Rating;
  @Input() floatLeft?: boolean;

  @Output() edit = new EventEmitter<any>();

  rating: number;
  hovered: number;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ratingObj && changes.ratingObj.currentValue) {
      this.rating = this.ratingObj.rating;
    }
  }

  updateRating(value: number) {
    if (value >= 0) {
      this.edit.emit(value);
    }
  }
}
