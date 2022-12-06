import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { tagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('query')
  queryTagList(): string {
    return 'query tag list';
  }

  @Post('create')
  createTag(@Body() createTagDto: tagDto): string {
    console.log(createTagDto);
    return 'create Tag';
  }

  @Put(':id')
  updateTag(@Param('id') id: number, @Body() updateTagDto: tagDto): string {
    console.log(updateTagDto);
    return `update Tag ${id}`;
  }

  @Delete('delete/:id')
  deleteTag(@Param('id') id: number): string {
    return `delete Tag ${id}`;
  }
}
