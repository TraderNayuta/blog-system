import { Category } from 'src/category/category.entity';
import { PostStatus } from 'src/common.type';
import { Tag } from 'src/tag/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  zhTitle: string;

  @Column()
  enTitle: string;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];

  @Column()
  zhContent: string;

  @Column()
  enContent: string;

  @Column()
  status: PostStatus;

  @CreateDateColumn()
  createTime?: Date;

  @UpdateDateColumn()
  updateTime?: Date;
}
