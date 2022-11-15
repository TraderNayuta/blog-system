import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleManagementComponent } from './views/home/article-management/article-management.component';
import { ArticleComponent } from './views/article/article.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'articleManagement', title: 'Article Management', component: ArticleManagementComponent },
      { path: '**', redirectTo: 'articleManagement' }
    ],
  },
  { path: 'article/:articleId', title: 'Article', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
