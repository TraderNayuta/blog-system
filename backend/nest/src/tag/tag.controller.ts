import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TagDto } from './tag.dto';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'src/common.interface';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('query')
  @HttpCode(200)
  async queryTagList(): Promise<Response> {
    const tagList = await this.tagService.queryTagList();
    return {
      data: {
        records: tagList,
      },
      msg: 'query tag list success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @HttpCode(200)
  async createTag(@Body() createTagDto: TagDto): Promise<Response> {
    await this.tagService.createTag(createTagDto);
    return {
      data: null,
      msg: 'success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @HttpCode(200)
  async updateTag(
    @Param('id') id: number,
    @Body() updateTagDto: TagDto,
  ): Promise<Response> {
    await this.tagService.updateTag(id, updateTagDto);
    return {
      data: null,
      msg: 'update success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  @HttpCode(200)
  async deleteTag(@Param('id') id: number): Promise<Response> {
    await this.tagService.deleteTag(id);
    return {
      data: null,
      msg: 'delete success!',
    };
  }
}
