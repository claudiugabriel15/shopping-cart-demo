import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Rating } from '../models/rating';

import * as _ from 'lodash';

@Injectable()
export class RatingService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private getStoredUserId() {
    const user = JSON.parse(localStorage.getItem('user'));

    return _.get(user, 'uid', null);
  }

  getRating(id: string) {
    return this.db.object(`ratings/${id}`).valueChanges().map(
      (values) => {
        return _.each(values, (value, key) => {
          return new Rating({ ...value, id: key });
        });
      }
    );
  }

  getUserRating(id: string) {
    const userId = this.getStoredUserId();

    return this.db.object(`ratings/${id}/user-ratings/${userId}`).valueChanges();
  }

  getUserRatings(id: string) {
    const userId = this.getStoredUserId();

    return this.db.list(`ratings/${id}/user-ratings/`).valueChanges();
  }

  updateRating(id: string, value: number) {
    const userId = this.getStoredUserId();

    return this.db.object(`ratings/${id}/user-ratings/${userId}/`).set({
      'rating': value
    });
  }

  updateAvgRating(id: string) {
    this.getUserRatings(id).take(1).map((rating) => {
      return this.computeAvgRating(rating);
    }).toPromise().then((avgRating) => {
      this.db.object(`ratings/${id}/`).update({
        'rating': avgRating
      });
    });
  }

  computeAvgRating(userRatings: any[]) {
    let ratingSum = 0;

    if (userRatings.length === 0) {
      return ratingSum;
    }

    _.forEach(userRatings, (userRating) => {
      ratingSum += _.get(userRating, 'rating', 0);
    });

    return ratingSum / userRatings.length;
  }
}
