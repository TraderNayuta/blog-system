import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/constants/interfaces';

const ELEMENT_DATA: Article[] = [
  {
    title: 'Angular 中如何使用自定义构建的 CKeditor', tags: [{
      name: {
        zh: 'ckeditor',
        en: 'ckeditor'
      }
    }, { name: { zh: 'angular', en: 'angular' } }], categories: [{ name: { zh: 'frontend', en: 'frontend' } }, { name: { zh: '富文本', en: 'rick-text' } }], content: { zh: 'abc666', en: 'fuck' }, status: 'draft'
  },
  {
    title: 'React DOM Diff 算法解析', tags: [{ name: { zh: 'React', en: 'React' } }, { name: { zh: 'Diff', en: 'Diff' } }], categories: [{ name: { zh: '前端', en: 'frontend' } }, {
      name: {
        zh: '算法',
        en: '算法'
      }
    }], content: { zh: 'abc666', en: 'fuck' }, status: 'published'
  }
];

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.scss'],
})
export class ArticleManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'categories', 'tags', 'actions'];
  dataSource = new MatTableDataSource<Article>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
