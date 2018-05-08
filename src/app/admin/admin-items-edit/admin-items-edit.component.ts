import { AlertService } from './../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './../../models/item';
import { Observable } from '@firebase/util';
import { FirebaseItemService } from './../../services/firebase-item.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/take';
import { AdminItemsDeleteConfirmationComponent } from './admin-items-delete-confirmation/admin-items-delete-confirmation.component';

@Component({
  selector: 'app-admin-items-edit',
  templateUrl: './admin-items-edit.component.html',
  styleUrls: ['./admin-items-edit.component.css']
})
export class AdminItemsEditComponent implements OnInit {
  data: Item = new Item({});
  types: any;

  constructor(
    private firebaseItemService: FirebaseItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public dialog: MatDialog) {

    const id = this.activatedRoute.snapshot.params.id || null;

    if (id) {
      this.getItemData(id);
    }

    this.types = this.firebaseItemService.getTypes();
  }

  ngOnInit() {
  }

  submit(f: any) {
    const submitObj = {};
    const formControls = f.controls;

    _.each(formControls, (value, key) => {
      if (value instanceof FormControl && value.dirty) {
        _.set(submitObj, key, value.value);
      }
    });

    this.firebaseItemService.saveItem(this.data.id, submitObj).then(
      () => {
        this.alertService.successAlert('Changes saved');
      },
      () => {
        this.alertService.successAlert('Could not save changes');
      }
    );
  }

  removeItem() {

    const dialogRef = this.dialog.open(AdminItemsDeleteConfirmationComponent, {
      width: '250px',
      data: { name: this.data.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseItemService.removetItem(this.data.id).then(
          () => {
            this.alertService.successAlert('Item ' + this.data.name + ' deleted');
            this.router.navigateByUrl('admin/items');
          },
          () => {
            this.alertService.successAlert('Could not delete item');
          });
      }

      return;
    });
  }

  getItemData(id: string) {
    this.firebaseItemService.getItem(id).take(1).subscribe(
      (itemData) => {
        this.data = itemData;
      }
    );
  }
}
