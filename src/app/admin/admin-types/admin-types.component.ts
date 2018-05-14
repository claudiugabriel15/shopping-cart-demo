import { EnhancedTableColumn } from './../../shared/enhanced-table/enhanced-table-column';
import { Type } from './../../models/type';
import { AlertService } from './../../services/alert.service';
import { Component, ViewChild } from '@angular/core';
import { FormControl, Form } from '@angular/forms';
import { FirebaseTypeService } from '../../services/firebase-type.service';
// tslint:disable-next-line:max-line-length
import { AdminItemTypesDeleteConfirmationComponent } from './admin-item-types-delete-confirmation/admin-item-types-delete-confirmation.component';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.css']
})
export class AdminTypesComponent {
  newType = new Type({});

  columns: EnhancedTableColumn[] = [
    {
      'name': 'id',
      'displayName': 'Id',
      'width': 45,
      'sort': true,
    },
    {
      'name': 'name',
      'displayName': 'Name',
      'width': 45,
      'sort': true,
    },
    {
      'name': 'delete',
      'displayName': '',
      'width': 10
    },
  ];
  rows: any;

  @ViewChild('f') form;

  constructor(
    private firebaseTypeService: FirebaseTypeService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.rows = this.firebaseTypeService.getTypes();
  }

  addType(type: Type) {
    this.firebaseTypeService.addType(type);
    this.cleanForm();
  }

  removeType(type: Type) {
    this.firebaseTypeService.isTypeInUse(type.id).take(1).subscribe(result => {
      if (result) {
        const dialogRef = this.dialog.open(AdminItemTypesDeleteConfirmationComponent, {
          width: '250px',
          data: { name: type.name}
        });

        dialogRef.afterClosed().subscribe(answer => {
          if (answer) {
            this.removeAndAlert(type);
          }
          return;
        });
      } else {
        this.removeAndAlert(type);
      }
    });
  }

  removeAndAlert(type: Type) {
    return this.firebaseTypeService.removeType(type).then(
      () => {
        this.alertService.successAlert('Type ' + type.name + ' deleted');
      },
      () => {
        this.alertService.successAlert('Could not delete type');
    });
  }

  cleanForm() {
    this.newType.clearFields();
    this.form.control.reset();
  }

}
