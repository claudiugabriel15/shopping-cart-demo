export class Item {
  public name?: string;
  public price?: number;
  public type?: string;
  public imageURL?: string;
  public description?: string;
  public id?: string;
  public quantity?: number;

  constructor(item: any) {
    this.name = item.name || '';
    this.price = item.price || null;
    this.type = item.type || '';
    this.imageURL = item.imageURL || '';
    this.description = item.description || '';
    this.id = item.id || '';
    this.quantity = item.quantity || 0;
  }
}
