import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostManagementComponent } from './views/post-management/post-management.component';
import { PostComponent } from './views/post/post.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PreviewComponent } from './views/preview/preview.component';

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
      {
        path: 'articleManagement',
        title: 'Article Management',
        component: PostManagementComponent,
      },
      {
        path: 'createArticle',
        title: 'Create Article',
        component: PostComponent,
      },
      {
        path: 'editArticle/:id',
        title: 'Edit Article',
        component: PostComponent,
      },
      {
        path: 'previewArticle/:id',
        title: 'Preview Article',
        component: PreviewComponent,
      },
      { path: '**', redirectTo: 'articleManagement' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
