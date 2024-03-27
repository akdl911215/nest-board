import { Dependencies, Injectable } from '@nestjs/common';
import { PrismaService } from '../_common/infrastructure/prisma.service';

@Injectable()
@Dependencies([PrismaService])
export class BoardsRepository {}
