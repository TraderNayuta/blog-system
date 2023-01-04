import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostDto } from './post.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'src/common.interface';
import { SearchPaginatorParams } from 'src/common.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('query')
  @HttpCode(200)
  async queryPostList(
    @Query() query: SearchPaginatorParams,
  ): Promise<Response> {
    const { pageSize, pageIndex } = query;

    const [records, total] = await this.postService.queryPostList(query);

    console.log(records, total);

    return {
      data: {
        records,
        pageSize: parseInt(pageSize),
        pageIndex: parseInt(pageIndex),
        total,
      },
      msg: 'query post list success!',
    };
  }

  @Get('query/:id')
  @HttpCode(200)
  queryPostById(@Param('id') id: number): string {
    console.log(id);
    return 'query post by id';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @HttpCode(200)
  async createPost(@Body() createPostDto: PostDto): Promise<Response> {
    const post = await this.postService.createPost(createPostDto);
    return {
      data: post.identifiers[0].id,
      msg: 'create success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @HttpCode(200)
  updatePost(@Param('id') id: number, @Body() updatePostDto: PostDto): string {
    console.log(updatePostDto);
    return `update post ${id}`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  @HttpCode(200)
  deletePost(@Param('id') id: number): string {
    return `delete post ${id}`;
  }
}
