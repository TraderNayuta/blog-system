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
import { categoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {
  constructor(private cagegoryService: CategoryService) {}

  @Get('query')
  queryCategoryList(): string {
    return 'query categorie list';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createCategory(@Body() createCategoryDto: categoryDto): string {
    console.log(createCategoryDto);
    return 'create Category';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: categoryDto,
  ): string {
    console.log(updateCategoryDto);
    return `update Category ${id}`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteCategory(@Param('id') id: number): string {
    return `delete Category ${id}`;
  }
}
