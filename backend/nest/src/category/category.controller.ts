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
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'src/common.interface';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('query')
  @HttpCode(200)
  async queryCategoryList(): Promise<Response> {
    const categoryList = await this.categoryService.queryCategoryList();
    return {
      data: {
        records: categoryList,
      },
      msg: 'query category list success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @HttpCode(200)
  async createCategory(
    @Body() createCategoryDto: CategoryDto,
  ): Promise<Response> {
    await this.categoryService.createCategory(createCategoryDto);
    return {
      data: null,
      msg: 'create success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @HttpCode(200)
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: CategoryDto,
  ): Promise<Response> {
    await this.categoryService.updateCategory(id, updateCategoryDto);
    return {
      data: null,
      msg: 'update success!',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  @HttpCode(200)
  async deleteCategory(@Param('id') id: number): Promise<Response> {
    await this.categoryService.deleteCategory(id);
    return {
      data: null,
      msg: 'delete success!',
    };
  }
}
