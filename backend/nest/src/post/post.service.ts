import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { SearchPaginatorParams } from 'src/common.dto';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async queryPostList(
    queryParams: SearchPaginatorParams,
  ): Promise<[Post[], number]> {
    const { searchString, pageSize, pageIndex } = queryParams;

    return this.postRepository
      .createQueryBuilder('post')
      .where(
        'post.zhTitle LIKE :searchString OR post.enTitle LIKE :searchString',
      )
      .setParameters({ searchString })
      .skip(pageSize * pageIndex)
      .take(pageSize)
      .getManyAndCount();
  }

  async createPost(createPostDto: PostDto): Promise<InsertResult> {
    return this.postRepository
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([
        {
          zhTitle: createPostDto.title.zh,
          enTitle: createPostDto.title.en,
          content: createPostDto.content,
          tags: createPostDto.tagIdList.join(','),
          categories: createPostDto.categoryIdList.join(','),
        },
      ])
      .execute();
  }
}
