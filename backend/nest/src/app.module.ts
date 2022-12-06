import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './orm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TagModule,
    CategoryModule,
    PostModule,
    TypeOrmModule.forRoot({
      ...OrmConfig,
      autoLoadEntities: true,
      logging: ['error', 'info', 'log', 'migration', 'query', 'schema', 'warn'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
