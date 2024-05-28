import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PrismaService } from './_common/infrastructure/prisma.service';
import { UsersModule } from './users/users.module';
import { RepliesModule } from './replies/replies.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import CONFIG_MODULE from './_common/infrastructure/env';
import { S3Module } from './_common/infrastructure/aws/s3/s3.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    CONFIG_MODULE,
    BoardsModule,
    UsersModule,
    CommentsModule,
    RepliesModule,
    ReactionsModule,
    S3Module,
    CategoriesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
