import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
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
      .orderBy('post.updateTime', 'DESC')
      .leftJoinAndSelect('post.categories', 'category')
      .leftJoinAndSelect('post.tags', 'tag')
      .skip(parseInt(pageSize) * parseInt(pageIndex))
      .take(parseInt(pageSize))
      .getManyAndCount();

    // return this.postRepository.createQueryBuilder('post').getManyAndCount();
  }

  async queryPostById(id: number): Promise<Post> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'category')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('post.id = :id', { id })
      .getOne();
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
          status: createPostDto.status,
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

  async updatePost(id: number, updatePostDto: PostDto): Promise<UpdateResult> {
    if (updatePostDto.tags) {
      const currentTags = await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'tags')
        .of(id)
        .loadMany();

      await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'tags')
        .of(id)
        .addAndRemove(updatePostDto.tags, currentTags);
    }

    if (updatePostDto.categories) {
      const currentCategories = await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'categories')
        .of(id)
        .loadMany();

      await this.postRepository
        .createQueryBuilder()
        .relation(Post, 'categories')
        .of(id)
        .addAndRemove(updatePostDto.categories, currentCategories);
    }

    const post = await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        zhTitle: updatePostDto.zhTitle,
        enTitle: updatePostDto.enTitle,
        zhContent: updatePostDto.zhContent,
        enContent: updatePostDto.enContent,
        status: updatePostDto.status,
      })
      .where('id = :id', { id })
      .execute();

    return post;
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postRepository
      .createQueryBuilder()
      .delete()
      .from('Post')
      .where('id = :id', { id })
      .execute();
  }
}
