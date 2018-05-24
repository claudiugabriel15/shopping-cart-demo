import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  public successAlert(message: string) {
    this.openSnackBar(message, 'success');
  }

  public errorAlert(message: string) {
    this.openSnackBar(message, 'error');
  }

  private openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message + '!', null, {
      duration: 3000,
      panelClass: panelClass
    });
  }
}
