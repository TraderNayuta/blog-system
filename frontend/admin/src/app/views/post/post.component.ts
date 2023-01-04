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
import { Category, Post, Tag } from 'src/app/constants/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActionTarget, ActionType } from 'src/app/constants/types';
import { ActionDialogComponent } from 'src/app/components/action-dialog/action-dialog.component';
import Editor from '../../../../ckeditor5/build/ckeditor.js';
import { TagService } from 'src/app/services/tag/tag.service';
import { DoubleConfirmDialogComponent } from 'src/app/components/double-confirm-dialog/double-confirm-dialog.component';
import { CategoryService } from 'src/app/services/category/category.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public Editor = Editor;

  postId: number;
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
    private categoryService: CategoryService,
    private postService: PostService
  ) {
    this.routerInfo.params.subscribe((params) => {
      this.postId = parseInt(params['id']);
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
    if (this.categories.length === 0) {
      this.queryCategoryList();
    }

    if (this.tags.length === 0) {
      this.queryTagList();
    }

    if (this.postId) {
      // If there is postId, need to request to query post detail
      this.queryPostDetail(this.postId);
    }
  }

  queryPostDetail(postId: number) {
    this.postService.queryPostDetail(postId).subscribe((res) => {
      // set form data
      for (let control in this.form.controls) {
        if (control === 'tags') {
          this.form.controls[control].setValue(
            res.data.tags.map((tag: Tag) => tag.id)
          );
        } else if (control === 'categories') {
          this.form.controls[control].setValue(
            res.data.categories.map((category: Category) => category.id)
          );
        } else {
          this.form.controls[control].setValue(res.data[control]);
        }
      }
    });
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
    this.formValidate();

    if (this.form.valid) {
      const params: Post = {
        zhTitle: this.form.controls['zhTitle'].value,
        enTitle: this.form.controls['enTitle'].value,
        categories: this.form.controls['categories'].value,
        tags: this.form.controls['tags'].value,
        zhContent: this.form.controls['zhContent'].value,
        enContent: this.form.controls['enContent'].value,
        status: 'draft',
      };

      if (this.postId) {
        this.postService.updatePost(this.postId, params).subscribe((res) => {
          // Mark the form as untouched after successfully saving, otherwise when click preview it will not be able to judge whether the form has unsaved changes.
          this.form.markAllAsTouched();
        });
      } else {
        this.postService.createPost(params).subscribe((res) => {
          this.postId = res.data;
          this.form.markAllAsTouched();
        });
      }
    }
  }

  preview(): void {
    if (this.form.touched) {
      // If form changes has not been saved
      this.snackBar.open(
        'Changes have not been saved, please save before previewing!'
      );
    } else {
      this.router.navigateByUrl(`/previewPost/${this.postId}`);
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

  queryTagList(updateForm = false): void {
    this.tagService.queryTagList().subscribe((res) => {
      this.globalService.setTags(res.data.records);

      if (updateForm) {
        this.form.controls['tags'].setValue(
          this.form.controls['tags'].value.filter((tagId: number) =>
            this.tags.some((tag: Tag) => tag.id === tagId)
          )
        );
      }
    });
  }

  queryCategoryList(updateForm = false): void {
    this.categoryService.queryCategoryList().subscribe((res) => {
      this.globalService.setCategories(res.data.records);

      if (updateForm) {
        this.form.controls['categories'].setValue(
          this.form.controls['categories'].value.filter((categoryId: number) =>
            this.categories.some(
              (category: Category) => category.id === categoryId
            )
          )
        );
      }
    });
  }

  editEntity(e: MouseEvent, target: ActionTarget, entity: Tag | Category) {
    e.stopPropagation();
    this.openActionDialog('Edit', target, entity);
  }

  deleteEntity(target: ActionTarget, id: number): void {
    if (target === 'tag') {
      this.tagService.deleteTag(id).subscribe((res) => {
        this.queryTagList(true);
      });
    } else {
      this.categoryService.deleteCategory(id).subscribe((res) => {
        this.queryCategoryList(true);
      });
    }
  }
}
