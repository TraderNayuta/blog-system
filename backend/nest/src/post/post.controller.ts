import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { postDto } from './post.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createPost(@Body() createPostDto: postDto): string {
    console.log(createPostDto);
    return 'create post';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: postDto): string {
    console.log(updatePostDto);
    return `update post ${id}`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deletePost(@Param('id') id: number): string {
    return `delete post ${id}`;
  }
}
