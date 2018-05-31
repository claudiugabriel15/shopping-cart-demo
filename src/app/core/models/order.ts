import { Item } from './item';

export class Order {
  id?: string;
  userId?: string;
  initDate: Date;
  shipDate: Date;
  items: Item[];
  shipping: {
    address: string;
    city: string;
    country: string;
  };
  shipped: boolean;
  cost: number;

  constructor(order: any) {
    this.id = order.id || '';
    this.userId = order.userId || '';
    this.initDate = order.initDate || Date.now();
    this.shipDate = order.shipDate || null;
    this.items = order.items || [];
    this.shipping = order.shipping || {};
    this.shipped = order.shipped || false;
    this.cost = order.cost || 0;
  }
}
