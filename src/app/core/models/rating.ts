export class Rating {
  public id?: string;
  public rating: number;
  public userRatings: any[];
  public ratingCount: number;

  constructor(rating: any) {
    this.id = rating.id || '';
    this.rating = rating.rating || 0;
    this.userRatings = rating['user-ratings'] || [];
    this.ratingCount = this.userRatings.length || 0;
  }
}
