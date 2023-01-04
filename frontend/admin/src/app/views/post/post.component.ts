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
import { ActionTarget, ActionType } from 'src/app/constants/types';
import { ActionDialogComponent } from 'src/app/components/action-dialog/action-dialog.component';
import Editor from '../../../../ckeditor5/build/ckeditor.js';
import { TagService } from 'src/app/services/tag/tag.service';
import { DoubleConfirmDialogComponent } from 'src/app/components/double-confirm-dialog/double-confirm-dialog.component';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public Editor = Editor;

  postId: string;
  form: FormGroup;
  categories: Category[];
  tags: Tag[];

  get tagsDiaplay(): string {
    return this.form.controls['tags'].value
      ? this.tags
          .filter((tag) => this.form.controls['tags'].value.includes(tag.id))
          .map((tag) => tag.zh)
          .join(',')
      : '';
  }

  get categoriesDiaplay(): string {
    return this.form.controls['categories'].value
      ? this.categories
          .filter((category) =>
            this.form.controls['categories'].value.includes(category.id)
          )
          .map((category) => category.zh)
          .join(',')
      : '';
  }

  constructor(
    private globalService: GlobalService,
    private routerInfo: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tagService: TagService,
    private categoryService: CategoryService
  ) {
    this.routerInfo.params.subscribe((params) => {
      this.postId = params['id'];
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

  ngOnInit(): void {
    this.queryTagList();
    this.queryCategoryList();
  }

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
      // this.router.navigateByUrl(`/previewPost/${this.postId}`)
    }
  }

  openActionDialog(
    actionType: ActionType,
    target: ActionTarget,
    entity?: Tag | Category
  ): void {
    const dialogRef = this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: {
        actionType,
        target,
        entity,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (target === 'tag') {
          this.queryTagList();
        } else {
          this.queryCategoryList();
        }
      }
    });
  }

  openDoubleConfirmDialog(
    e: MouseEvent,
    target: ActionTarget,
    entity: Tag | Category
  ): void {
    e.stopPropagation();
    const dialogRef = this.dialog.open(DoubleConfirmDialogComponent, {
      width: '400px',
      data: {
        header: `Delete ${target}`,
        content: `Are you sure to delete this ${target}: ${entity.zh}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEntity(target, entity.id);
      }
    });
  }

  queryTagList(): void {
    this.tagService.queryTagList().subscribe((res) => {
      this.globalService.setTags(res.data.records);
    });
  }

  queryCategoryList(): void {
    this.categoryService.queryCategoryList().subscribe((res) => {
      this.globalService.setCategories(res.data.records);
    });
  }

  editEntity(e: MouseEvent, target: ActionTarget, entity: Tag | Category) {
    e.stopPropagation();
    this.openActionDialog('Edit', target, entity);
  }

  deleteEntity(target: ActionTarget, id: number): void {
    if (target === 'tag') {
      this.tagService.deleteTag(id).subscribe((res) => {
        this.queryTagList();
      });
    } else {
      this.categoryService.deleteCategory(id).subscribe((res) => {
        this.queryCategoryList();
      });
    }
  }
}
