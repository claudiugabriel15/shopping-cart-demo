export class Item {
  public name?: string;
  public price?: number;
  public type?: string;
  public imageURL?: string;
  public description?: string;
  public id?: string;
  public quantity?: number;
  public images?: string[];

  constructor(item: any) {
    this.name = item.name || '';
    this.price = item.price || null;
    this.type = item.type || '';
    this.imageURL = item.imageURL || '';
    this.description = item.description || '';
    this.id = item.id || '';
    this.quantity = item.quantity || 0;
    this.images = this.buildItemsArray(item.images);
  }

  private buildItemsArray(images) {
    const imageArray = [];
    if (images) {
      Object.keys(images).forEach(key => {
        const value = images[key];
        value['id'] = key;
        imageArray.push(value);
      });
    }

    return imageArray;
  }
}
