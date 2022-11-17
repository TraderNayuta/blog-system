import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleConfirmDialogComponent } from 'src/app/components/double-confirm-dialog/double-confirm-dialog.component';
import { Post } from 'src/app/constants/interfaces';
import { ELEMENT_DATA } from 'src/app/constants/mock';
import { DialogActionType } from 'src/app/constants/types';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'categories', 'tags', 'actions'];
  dataSource = new MatTableDataSource<Post>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  queryArticleList() {
    // 查询 Article 列表
  }

  openDialog(type: DialogActionType, article: Post): void {
    const dialogRef = this.dialog.open(DoubleConfirmDialogComponent, {
      width: '400px',
      data: {
        header: `${type} Article`,
        content: `Are you sure to ${type.toLowerCase()} this article: ${
          article.title
        }`,
      },
    });

    const handler =
      type === 'Delete' ? this.deleteArticle : this.publishArticle;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        handler(article.id);
      }
    });
  }

  publishArticle(articleId: string): void {
    // 发布文章
  }

  deleteArticle(articleId: string): void {
    // 删除文章
  }
}
