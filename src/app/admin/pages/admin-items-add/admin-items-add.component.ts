import {
  FirebaseTypeService,
  FirebaseItemService,
  AlertService
 } from '../../../core/services/services';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../../core/models/item';

@Component({
  selector: 'app-admin-items-add',
  templateUrl: './admin-items-add.component.html',
  styleUrls: ['./admin-items-add.component.css']
})
export class AdminItemsAddComponent implements OnInit {
  newItem: Item;
  types: any;

  constructor(
    private firebaseItemService: FirebaseItemService,
    private firebaseTypeService: FirebaseTypeService,
    private alertservice: AlertService
  ) {
    this.newItem = new Item({});
    this.types = this.firebaseTypeService.getTypes();
  }

  ngOnInit() {
  }

  submit(form: any) {
    this.firebaseItemService.addItem(form.value).then(
      () => this.alertservice.successAlert('Item added'),
      () => this.alertservice.errorAlert('Could not add item')
    );
  }
}
