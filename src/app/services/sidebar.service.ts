import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  public isOpened = false;

  constructor() { }

  public toggle() {
    this.isOpened = !this.isOpened;
  }

}
