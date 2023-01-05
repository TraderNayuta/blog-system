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
  async queryPostById(@Param('id') id: number): Promise<Response> {
    const post = await this.postService.queryPostById(id);
    return {
      data: post,
      msg: 'query post detail success!',
    };
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
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: PostDto,
  ): Promise<Response> {
    await this.postService.updatePost(id, updatePostDto);
    return {
      data: null,
      msg: 'update success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  @HttpCode(200)
  async deletePost(@Param('id') id: number): Promise<Response> {
    await this.postService.deletePost(id);
    return {
      data: null,
      msg: 'delete success!',
    };
  }
}
