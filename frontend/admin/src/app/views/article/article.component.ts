import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { categories, tags } from 'src/app/constants/mock';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articleId: string;
  form: FormGroup;
  categories = categories;
  tags = tags;

  constructor(
    private routerInfo: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.routerInfo.params.subscribe((params) => {
      this.articleId = params['id'];
    });

    this.form = this.fb.group({
      title: [null, Validators.required],
      categories: [[], Validators.required],
      tags: [[], Validators.required],
      content: [null],
    });
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
