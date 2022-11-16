import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  articleId: string;
  articleContent: SafeHtml;

  constructor(
    private location: Location,
    private routerInfo: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.routerInfo.params.subscribe((params) => {
      this.articleId = params['id'];
    });
  }

  ngOnInit(): void {
    this.articleContent = this.sanitizer.bypassSecurityTrustHtml(
      `<h2 style="text-align:center;">Test Article</h2><p style="margin-left:40px;">Hello, this is a test article.</p><p style="margin-left:40px;">I'm a <i><strong><u>front-end</u></strong></i> developer in <span style="background-color:hsl(60,75%,60%);">Nanjing</span>. I'm now learning <span style="font-family:'Courier New', Courier, monospace;">golang</span> &amp; <span class="text-big">web3</span>, do you want to <span style="color:hsl(240,75%,60%);">join </span>me?hahah , <a href="https://www.baidu.com">baidu.com</a>.</p><ul><li>12</li><li>dfdsafa</li></ul><ol><li>dsfdas</li><li>xcvxcsdaf</li></ol><p style="margin-left:40px;text-align:right;"><mark class="marker-yellow">fsdfdsadasf sdfdfasdf</mark></p><p style="margin-left:40px;">&nbsp;</p><hr><blockquote><p>sadfasfdsas</p></blockquote><p><code>fdfads dsfdsafasfa</code></p><p>&nbsp;</p><pre><code class="language-javascript">function hello() {
        console.log('hello');
      }</code></pre>`
    );
  }

  goBack() {
    this.location.back();
  }
}
