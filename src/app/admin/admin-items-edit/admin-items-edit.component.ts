import { AlertService } from './../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './../../models/item';
import { Observable } from '@firebase/util';
import { FirebaseItemService } from './../../services/firebase-item.service';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/take';
import { AdminItemsDeleteConfirmationComponent } from './admin-items-delete-confirmation/admin-items-delete-confirmation.component';
import { AdminItemsAddImageComponent } from './admin-items-add-image/admin-items-add-image.component';
import { FirebaseTypeService } from '../../services/firebase-type.service';
import { Config } from '../../../config/config';

@Component({
  selector: 'app-admin-items-edit',
  templateUrl: './admin-items-edit.component.html',
  styleUrls: ['./admin-items-edit.component.css']
})
export class AdminItemsEditComponent {
  data: Item = new Item({});
  loaded = false;
  types: any;

  constructor(
    private firebaseItemService: FirebaseItemService,
    private firebaseTypeService: FirebaseTypeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public dialog: MatDialog,
    public config: Config,
    ) {

    const id = this.activatedRoute.snapshot.params.id || null;

    if (id) {
      this.getItemData(id);
    }

    this.types = this.firebaseTypeService.getTypes();
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
        this.firebaseItemService.removeItem(this.data.id).then(
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
        this.loaded = true;
      },
      (error: Error) => {
        this.alertService.errorAlert(error.message);
        this.loaded = true;
      }
    );
  }

  addImage() {
    const dialogRef = this.dialog.open(AdminItemsAddImageComponent, {
      width: '350px',
      data: { name: this.data.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseItemService.addImage(this.data.id, result).then(
          () => {
            this.alertService.successAlert('Image added');
            this.getItemData(this.data.id);
          },
          () => {
            this.alertService.successAlert('Could not add image');
        });
      }

      return;
    });
  }

  removeImage(image: any) {
    this.firebaseItemService.removeImage(this.data.id, _.get(image, 'id', null)).then(
      () => {
        this.alertService.successAlert('Image removed');
        this.getItemData(this.data.id);
      },
      () => {
        this.alertService.successAlert('Could not remove image');
    });
  }
}
