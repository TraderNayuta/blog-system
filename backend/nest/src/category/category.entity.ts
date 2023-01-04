import { Post } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  zh: string;

  @Column()
  en: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];

  @CreateDateColumn()
  createTime?: Date;

  @UpdateDateColumn()
  updateTime?: Date;
}
