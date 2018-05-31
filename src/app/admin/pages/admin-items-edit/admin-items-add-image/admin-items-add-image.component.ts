import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-items-add-image',
  templateUrl: './admin-items-add-image.component.html',
  styleUrls: ['./admin-items-add-image.component.css']
})
export class AdminItemsAddImageComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminItemsAddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(this.data.imageUrl);
  }
}
