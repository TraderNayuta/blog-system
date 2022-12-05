import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { tagDto } from './tag.dto';

@Controller('tag')
export class TagController {
  @Get('query')
  queryTagList(): string {
    return 'query tag list';
  }

  @Post('create')
  createTag(@Body() createTagDto: tagDto): string {
    console.log(createTagDto);
    return 'create Tag';
  }

  @Post('update')
  updateTag(@Body() updateTagDto: tagDto): string {
    console.log(updateTagDto);
    return 'update Tag';
  }

  @Delete('delete/:id')
  deleteTag(@Param('id') id: string): string {
    return `delete Tag ${id}`;
  }
}
