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
import { tagDto } from './tag.dto';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('query')
  queryTagList(): string {
    return 'query tag list';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createTag(@Body() createTagDto: tagDto): string {
    console.log(createTagDto);
    return 'create Tag';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateTag(@Param('id') id: number, @Body() updateTagDto: tagDto): string {
    console.log(updateTagDto);
    return `update Tag ${id}`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteTag(@Param('id') id: number): string {
    return `delete Tag ${id}`;
  }
}
