import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDialogData } from 'src/app/constants/interfaces';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      zh: [null, Validators.required],
      en: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  close(): void {
    this.dialogRef.close();
  }
}
