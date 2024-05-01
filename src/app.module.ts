import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './_common/infrastructure/prisma.service';
import { UsersModule } from './users/users.module';
import { RepliesModule } from './replies/replies.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    ConfigModule,
    BoardsModule,
    UsersModule,
    CommentsModule,
    RepliesModule,
    ReactionsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
