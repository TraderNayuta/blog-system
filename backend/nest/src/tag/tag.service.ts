import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  queryTagList(): Promise<Tag[]> {
    return this.tagRepository.createQueryBuilder().getMany();
  }

  createTag(createTagDto: TagDto): Promise<InsertResult> {
    return this.tagRepository
      .createQueryBuilder()
      .insert()
      .into('Tag')
      .values([
        {
          zh: createTagDto.zh,
          en: createTagDto.en,
        },
      ])
      .execute();
  }

  updateTag(id: number, updateTagDto: TagDto): Promise<UpdateResult> {
    return this.tagRepository
      .createQueryBuilder()
      .update(Tag)
      .set({ en: updateTagDto.en, zh: updateTagDto.zh })
      .where('id = :id', { id })
      .execute();
  }

  deleteTag(id: number): Promise<DeleteResult> {
    return this.tagRepository
      .createQueryBuilder()
      .delete()
      .from(Tag)
      .where('id = :id', { id })
      .execute();
  }
}
