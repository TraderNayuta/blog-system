import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleConfirmDialogComponent } from 'src/app/components/double-confirm-dialog/double-confirm-dialog.component';
import { Post } from 'src/app/constants/interfaces';
import { DialogActionType } from 'src/app/constants/types';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit, AfterViewInit {
  searchString: string;
  displayedColumns: string[] = ['title', 'categories', 'tags', 'actions'];
  dataSource = new MatTableDataSource<Post>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.queryPostList();
  }

  applyFilter() {
    this.paginator.pageIndex = 0;
    this.queryPostList();
  }

  queryPostList() {
    const queryParams = {
      pageSize: this.paginator.pageSize,
      pageIndex: this.paginator.pageIndex,
    };

    if (this.searchString) {
      queryParams['searchString'] = this.searchString;
    }

    // 查询 Post 列表
    this.postService.queryPostList(queryParams).subscribe((res) => {
      this.paginator.length = res.data.total;
      this.dataSource = new MatTableDataSource<Post>([]);
    });
  }

  pageChange(event: PageEvent) {
    console.log(event);
    this.queryPostList();
  }

  openDialog(type: DialogActionType, post: Post): void {
    const dialogRef = this.dialog.open(DoubleConfirmDialogComponent, {
      width: '400px',
      data: {
        header: `${type} Post`,
        content: `Are you sure to ${type.toLowerCase()} this post: ${
          post.title
        }`,
      },
    });

    const handler = type === 'Delete' ? this.deletePost : this.publishPost;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        handler(post.id);
      }
    });
  }

  publishPost(postId: string): void {
    // 发布文章
  }

  deletePost(postId: string): void {
    // 删除文章
  }
}
