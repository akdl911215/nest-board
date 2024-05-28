import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import { CategoriesRepository } from './categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    // infrastructure
    PrismaService,

    // service
    { provide: 'SERVICE', useClass: CategoriesService },

    // repository
    { provide: 'REPOSITORY', useClass: CategoriesRepository },
  ],
})
export class CategoriesModule {}
