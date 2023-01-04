import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/constants/interfaces';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  postId: number;
  postDetail: Post;

  zhContent: SafeHtml;
  enContent: SafeHtml;

  constructor(
    private location: Location,
    private routerInfo: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private postService: PostService
  ) {
    this.routerInfo.params.subscribe((params) => {
      this.postId = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.queryPostDetail(this.postId);
  }

  queryPostDetail(postId: number) {
    this.postService.queryPostDetail(postId).subscribe((res) => {
      this.postDetail = res.data;
      this.zhContent = this.sanitizer.bypassSecurityTrustHtml(
        res.data.zhContent
      );
      this.enContent = this.sanitizer.bypassSecurityTrustHtml(
        res.data.enContent
      );
    });
  }

  goBack() {
    this.location.back();
  }
}
