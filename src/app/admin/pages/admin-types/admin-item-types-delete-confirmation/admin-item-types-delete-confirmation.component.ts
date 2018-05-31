import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-item-types-delete-confirmation',
  templateUrl: './admin-item-types-delete-confirmation.component.html',
  styleUrls: ['./admin-item-types-delete-confirmation.component.css']
})

export class AdminItemTypesDeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminItemTypesDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
