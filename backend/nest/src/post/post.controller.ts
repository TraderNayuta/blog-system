import {
  Body,
  Controller,
  Delete,
  Get,
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
  async queryPostList(
    @Query() query: SearchPaginatorParams,
  ): Promise<Response> {
    const { pageSize, pageIndex } = query;

    const [records, total] = await this.postService.queryPostList(query);

    return {
      data: {
        records,
        pageSize,
        pageIndex,
        total,
      },
      msg: 'query post list success!',
    };
  }

  @Get('query/:id')
  queryPostById(@Param('id') id: number): string {
    console.log(id);
    return 'query post by id';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createPost(@Body() createPostDto: PostDto): string {
    console.log(createPostDto);
    return 'create post';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: PostDto): string {
    console.log(updatePostDto);
    return `update post ${id}`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deletePost(@Param('id') id: number): string {
    return `delete post ${id}`;
  }
}
