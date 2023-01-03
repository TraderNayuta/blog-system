import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  tags: string;

  @Column()
  categories: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createTime?: Date;

  @UpdateDateColumn()
  updateTime?: Date;
}
