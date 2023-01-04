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
    // need transactions: need to update typeorm to use latest best practice DataSource
    const post = await this.postRepository
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([
        {
          zhTitle: createPostDto.zhTitle,
          enTitle: createPostDto.enTitle,
          zhContent: createPostDto.zhContent,
          enContent: createPostDto.enContent,
        },
      ])
      .execute();

    const postId = post.identifiers[0].id;

    await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'tags')
      .of(postId)
      .add(createPostDto.tags);

    await this.postRepository
      .createQueryBuilder()
      .relation(Post, 'categories')
      .of(postId)
      .add(createPostDto.categories);

    return post;
  }
}
