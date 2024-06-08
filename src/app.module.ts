import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PrismaService } from './_common/infrastructure/prisma.service';
import { UsersModule } from './users/users.module';
import { RepliesModule } from './replies/replies.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { S3Module } from './_common/infrastructure/aws/s3/s3.module';
import { CategoriesModule } from './categories/categories.module';
import { SearchesModule } from './searches/searches.module';
import CONFIG_MODULE from './_common/infrastructure/env';
import { RedisProvider } from './_common/infrastructure/redis/redis.config';
import { CommunitiesModule } from './communities/communities.module';

@Module({
  imports: [
    S3Module,
    CONFIG_MODULE,
    BoardsModule,
    UsersModule,
    CommentsModule,
    RepliesModule,
    ReactionsModule,
    CategoriesModule,
    SearchesModule,
    CommunitiesModule,
  ],
  exports: [RedisProvider],
  controllers: [],
  providers: [PrismaService, RedisProvider],
})
export class AppModule {}
