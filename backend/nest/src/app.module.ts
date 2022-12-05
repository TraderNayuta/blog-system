import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { TagController } from './tag/tag.controller';
import { PostController } from './post/post.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoryController,
    TagController,
    PostController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
