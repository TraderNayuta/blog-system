import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleConfirmDialogComponent } from 'src/app/components/double-confirm-dialog/double-confirm-dialog.component';
import { Category, Post, Tag } from 'src/app/constants/interfaces';
import { DialogActionType } from 'src/app/constants/types';
import { CategoryService } from 'src/app/services/category/category.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { PostService } from 'src/app/services/post/post.service';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit, AfterViewInit {
  searchString: string;
  searchCategory: string;
  searchTag: string;
  displayedColumns: string[] = [
    'zhTitle',
    'enTitle',
    'categories',
    'tags',
    'updateTime',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Post>([]);
  categories: Category[];
  tags: Tag[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private globalService: GlobalService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {
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
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.queryPostList();
  }

  clearSearchString() {
    this.searchString = '';
    this.applyFilter();
  }

  applyFilter() {
    this.paginator.pageIndex = 0;
    this.queryPostList();
  }

  onCategoryChange(value) {
    console.log(typeof value);
    this.searchCategory = value;
    this.queryPostList();
  }

  onTagChange(value) {
    console.log(typeof value);
    this.searchTag = value;
    this.applyFilter();
  }

  queryPostList() {
    const queryParams = {
      pageSize: this.paginator.pageSize,
      pageIndex: this.paginator.pageIndex,
    };

    console.log(this.searchTag, this.searchCategory);

    if (this.searchString) {
      queryParams['searchString'] = this.searchString;
    }

    if (this.searchCategory) {
      queryParams['searchCategory'] = this.searchCategory;
    }

    if (this.searchTag) {
      queryParams['searchTag'] = this.searchTag;
    }

    // 查询 Post 列表
    this.postService.queryPostList(queryParams).subscribe((res) => {
      this.paginator.length = res.data.total;
      this.dataSource = new MatTableDataSource<Post>(res.data.records);
    });
  }

  queryCategoryList(): void {
    this.categoryService.queryCategoryList().subscribe((res) => {
      this.globalService.setCategories(res.data.records);
    });
  }

  queryTagList(): void {
    this.tagService.queryTagList().subscribe((res) => {
      this.globalService.setTags(res.data.records);
    });
  }

  pageChange(event: PageEvent) {
    this.queryPostList();
  }

  openDialog(type: DialogActionType, post: Post): void {
    const dialogRef = this.dialog.open(DoubleConfirmDialogComponent, {
      width: '400px',
      data: {
        header: `${type} Post`,
        content: `Are you sure to ${type.toLowerCase()} this post: ${
          post.zhTitle
        }`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        type === 'Delete'
          ? this.deletePost(post.id)
          : this.publishPost(post.id);
      }
    });
  }

  publishPost(postId: number): void {
    this.postService
      .updatePost(postId, {
        status: 'published',
      })
      .subscribe((res) => {
        this.queryPostList();
      });
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe((res) => {
      this.queryPostList();
    });
  }
}
