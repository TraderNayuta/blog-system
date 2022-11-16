import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoubleConfirmDialogData } from 'src/app/constants/interfaces';

@Component({
  selector: 'app-double-confirm-dialog',
  templateUrl: './double-confirm-dialog.component.html',
  styleUrls: ['./double-confirm-dialog.component.scss'],
})
export class DoubleConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DoubleConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DoubleConfirmDialogData
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
