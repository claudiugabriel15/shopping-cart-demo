import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-items-delete-confirmation',
  templateUrl: './admin-items-delete-confirmation.component.html',
  styleUrls: ['./admin-items-delete-confirmation.component.css']
})
export class AdminItemsDeleteConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<AdminItemsDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
