import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostManagementComponent } from './views/post-management/post-management.component';
import { PostComponent } from './views/post/post.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PreviewComponent } from './views/preview/preview.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'postManagement',
        title: 'Post Management',
        component: PostManagementComponent,
      },
      {
        path: 'createPost',
        title: 'Create Post',
        component: PostComponent,
      },
      {
        path: 'editPost/:id',
        title: 'Edit Post',
        component: PostComponent,
      },
      {
        path: 'previewPost/:id',
        title: 'Preview Post',
        component: PreviewComponent,
      },
      { path: '**', redirectTo: 'postManagement' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
