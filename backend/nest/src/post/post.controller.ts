import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { postDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('query')
  queryPostList(): string {
    return 'query post List';
  }

  @Get('query/:id')
  queryPostById(@Param('id') id: number): string {
    console.log(id);
    return 'query post by id';
  }

  @Post('create')
  createPost(@Body() createPostDto: postDto): string {
    console.log(createPostDto);
    return 'create post';
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: postDto): string {
    console.log(updatePostDto);
    return `update post ${id}`;
  }

  @Delete('delete/:id')
  deletePost(@Param('id') id: number): string {
    return `delete post ${id}`;
  }
}
