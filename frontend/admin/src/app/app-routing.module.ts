import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleManagementComponent } from './views/article-management/article-management.component';
import { ArticleComponent } from './views/article/article.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articleManagement', component: ArticleManagementComponent },
  { path: 'article/:articleId', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
