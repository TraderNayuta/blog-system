import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionDialogData } from 'src/app/constants/interfaces';
import { CategoryService } from 'src/app/services/category/category.service';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionDialogData,
    private fb: FormBuilder,
    private tagService: TagService,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      zh: [null, Validators.required],
      en: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.entity) {
      this.form.controls['zh'].setValue(this.data.entity.zh);
      this.form.controls['en'].setValue(this.data.entity.en);
    }
  }

  getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  confirm(): void {
    const params = {
      zh: this.form.controls['zh'].value,
      en: this.form.controls['en'].value,
    };

    if (this.data.target === 'tag') {
      if (this.data.actionType === 'Add') {
        this.tagService.createTag(params).subscribe((res) => {
          this.dialogRef.close(true);
        });
      } else {
        this.tagService
          .updateTag(this.data.entity.id, params)
          .subscribe((res) => {
            this.dialogRef.close(true);
          });
      }
    } else {
      if (this.data.actionType === 'Add') {
        this.categoryService.createCategory(params).subscribe((res) => {
          this.dialogRef.close(true);
        });
      } else {
        this.categoryService
          .updateCategory(this.data.entity.id, params)
          .subscribe((res) => {
            this.dialogRef.close(true);
          });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
