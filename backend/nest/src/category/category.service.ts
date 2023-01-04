import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  queryCategoryList(): Promise<Category[]> {
    return this.categoryRepository.createQueryBuilder().getMany();
  }

  createCategory(createCategoryDto: CategoryDto): Promise<InsertResult> {
    return this.categoryRepository
      .createQueryBuilder()
      .insert()
      .into('Category')
      .values([
        {
          zh: createCategoryDto.zh,
          en: createCategoryDto.en,
        },
      ])
      .execute();
  }

  updateCategory(
    id: number,
    updateCategoryDto: CategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryRepository
      .createQueryBuilder()
      .update(Category)
      .set({ en: updateCategoryDto.en, zh: updateCategoryDto.zh })
      .where('id = :id', { id })
      .execute();
  }

  deleteCategory(id: number): Promise<DeleteResult> {
    return this.categoryRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where('id = :id', { id })
      .execute();
  }
}
