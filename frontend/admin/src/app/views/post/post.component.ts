import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { Category, Tag } from 'src/app/constants/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActionTarget } from 'src/app/constants/types';
import { ActionDialogComponent } from 'src/app/components/action-dialog/action-dialog.component';
import Editor from '../../../../ckeditor5/build/ckeditor.js';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public Editor = Editor;

  articleId: string;
  form: FormGroup;
  categories: Category[];
  tags: Tag[];

  constructor(
    private globalService: GlobalService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.routerInfo.params.subscribe((params) => {
      this.articleId = params['id'];
    });

    this.form = this.fb.group({
      zhTitle: [null, Validators.required],
      enTitle: [null, Validators.required],
      categories: [[], Validators.required],
      tags: [[], Validators.required],
      zhContent: [null],
      enContent: [null],
    });

    this.globalService.categories.subscribe((categories) => {
      this.categories = categories;
    });

    this.globalService.tags.subscribe((tags) => {
      this.tags = tags;
    });
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  formValidate(): void {
    // Validate the form
    this.form.markAllAsTouched();
  }

  save(): void {
    console.log(this.form.controls['zhContent'].value);
    this.formValidate();

    if (this.form.valid) {
      // 保存成功后将 form 置为未变更状态，否则预览时无法判断是否有未变更的提交
      this.form.markAsUntouched();
    }
  }

  preview(): void {
    if (this.form.touched) {
      // If form changes has not been saved
      this.snackBar.open('您有更改尚未保存，请保存后再预览！');
    } else {
      // this.router.navigateByUrl(`/previewArticle/${this.articleId}`)
    }
  }

  openAddDialog(type: ActionTarget): void {
    this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: {
        actionType: 'Add',
        type,
      },
    });
  }
}
