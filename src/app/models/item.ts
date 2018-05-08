export class Item {
  public name?: string;
  public price?: number;
  public type?: string;
  public imageURL?: string;
  public description?: string;
  public id?: string;

  constructor(item: any) {
    this.name = item.name || '';
    this.price = item.price || null;
    this.type = item.type || '';
    this.imageURL = item.imageURL || '';
    this.description = item.description || '';
    this.id = item.id || '';
  }
}
