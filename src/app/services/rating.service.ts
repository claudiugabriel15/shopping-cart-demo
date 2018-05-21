import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RatingService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAvgRating(id: string) {
    return this.db.object(`ratings/${id}`).valueChanges().take(1);
  }

}
