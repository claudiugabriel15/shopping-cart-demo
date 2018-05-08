import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { FirebaseItemService } from '../../services/firebase-item.service';
import { AlertService } from '../../services/alert.service';

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
    private alertservice: AlertService
  ) {
    this.newItem = new Item({});
    this.types = this.firebaseItemService.getTypes();
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
