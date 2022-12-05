import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { postDto } from './post.dto';

@Controller('post')
export class PostController {
  @Get('query')
  queryPostList(): string {
    return 'query post List';
  }

  @Get('query/:id')
  queryPostById(@Param('id') id: string): string {
    console.log(id);
    return 'query post by id';
  }

  @Post('create')
  createPost(@Body() createPostDto: postDto): string {
    console.log(createPostDto);
    return 'create post';
  }

  @Post('update')
  updatePost(@Body() updatePostDto: postDto): string {
    console.log(updatePostDto);
    return 'update post';
  }

  @Delete('delete/:id')
  deletePost(@Param('id') id: string): string {
    return `delete post ${id}`;
  }
}
