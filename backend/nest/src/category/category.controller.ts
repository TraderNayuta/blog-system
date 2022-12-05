import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { categoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  @Get('query')
  queryCategoryList(): string {
    return 'query categorie list';
  }

  @Post('create')
  createCategory(@Body() createCategoryDto: categoryDto): string {
    console.log(createCategoryDto);
    return 'create Category';
  }

  @Post('update')
  updateCategory(@Body() updateCategoryDto: categoryDto): string {
    console.log(updateCategoryDto);
    return 'update Category';
  }

  @Delete('delete/:id')
  deleteCategory(@Param('id') id: string): string {
    return `delete Category ${id}`;
  }
}
