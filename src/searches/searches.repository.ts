import { Dependencies, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { SearchesRepositoryInterface } from './interfaces/searches.repository.interface';
import { SearchesBaseDto } from './dtos/searches.base.dto';
import { errorHandling } from '../_common/abstract/error.handling';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../_common/infrastructure/prisma.service';
import * as console from 'console';
import { Boards, Categories, Comments, Users } from '@prisma/client';

@Injectable()
@Dependencies([Redis, PrismaService])
export class SearchesRepository implements SearchesRepositoryInterface {
  constructor(
    @Inject('REDIS_MODULE') private readonly redis: Redis,
    private readonly prisma: PrismaService,
  ) {}

  public async getSearchBoards(entity: {
    readonly query: string;
  }): Promise<Boards[]> {
    const { query } = entity;

    const searchBoards: Boards[] = await this.prisma.boards.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { hasSome: [query] } },
              { nickname: { contains: query, mode: 'insensitive' } },
            ],
          },
          { type: 'TEXT' },
          { deleted_at: null },
        ],
      },
    });

    return searchBoards;
  }

  public async getSearchComments(entity: {
    readonly query: string;
  }): Promise<Comments[]> {
    const { query } = entity;

    const searchComments: Comments[] = await this.prisma.comments.findMany({
      where: {
        AND: [
          {
            OR: [
              { nickname: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ],
          },
          { deleted_at: null },
        ],
      },
    });

    return searchComments;
  }

  public async getSearchMedia(entity: {
    readonly query: string;
  }): Promise<Boards[]> {
    const { query } = entity;

    const searchBoards: Boards[] = await this.prisma.boards.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { hasSome: [query] } },
              { nickname: { contains: query, mode: 'insensitive' } },
            ],
          },
          { OR: [{ type: 'MEDIA' }, { type: 'LINK' }] },
          { deleted_at: null },
        ],
      },
    });
    console.log('searchBoards : ', searchBoards);

    return searchBoards;
  }

  public async getSearchPeople(entity: {
    readonly query: string;
  }): Promise<Users[]> {
    const { query } = entity;

    const searchPeople: Users[] = await this.prisma.users.findMany({
      where: {
        AND: [
          {
            OR: [
              { nickname: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ],
          },
          { deleted_at: null },
        ],
      },
    });

    return searchPeople;
  }

  public async getSearchCommunities(entity: {
    readonly query: string;
  }): Promise<Categories[]> {
    const { query } = entity;

    // const serchCommunities
    return Promise.resolve([]);
  }

  public async addSearch(entity: {
    readonly query: SearchesBaseDto['query'];
  }): Promise<void> {
    const { query } = entity;

    try {
      await this.redis.zincrby('searches', 1, query);

      // 검색어에 TTL 설정 (12시간 = 43200초)
      await this.redis.expire(query, 43200);
    } catch (e: any) {
      errorHandling(e);
    }
  }

  public async getTopSearch(): Promise<
    {
      readonly query: SearchesBaseDto['query'];
      readonly count: SearchesBaseDto['count'];
    }[]
  > {
    try {
      const topTenSearches = await this.redis.zrevrange(
        'searches',
        0,
        9,
        'WITHSCORES',
      );
      // this.redis.zrevrange('searches', 0, 9, 'WITHSCORES')는 Redis의 ZREVRANGE
      // 명령을 사용하여 searches라는 정렬된 셋(sorted set)에서 상위 10개의 항목을 점수와 함께 가져옴.

      // 0은 시작 인덱스를 의미하며, 9는 끝 인덱스를 의미합니다. 즉, 상위 10개의 검색어를 가져옴
      // 'WITHSCORES'는 각 항목의 점수(검색 횟수)를 함께 반환하도록 지정함
      // 반환된 결과는 검색어와 해당 검색어의 횟수가 번갈아 가며 배열 형태로 포함됨.

      const result = [];
      for (let i = 0; i < topTenSearches.length; i += 2) {
        result.push({
          query: topTenSearches[i],
          count: parseInt(topTenSearches[i + 1], 10),
        });
      }
      return result;
    } catch (e: any) {
      errorHandling(e);
    }
  }

  // 매 시간마다 실행되는 크론 작업
  @Cron('0 * * * *')
  async decrementScores() {
    await this.redis.eval(
      `local keys = redis.call('ZRANGE', 'searches', 0, -1)
         for _, key in ipairs(keys) do
           local new_score = redis.call('ZINCRBY', 'searches', -1, key)
           if tonumber(new_score) <= 0 then
             redis.call('ZREM', 'searches', key)
           end
         end
         return keys`,
      0,
    );
  }
}

// @Cron('0 0 * * *'): 매일 자정 (00:00)에 실행
// @Cron('0 0 * * 0'): 매주 일요일 자정 (00:00)에 실행
// @Cron('0 9 * * 1-5'): 매주 월요일부터 금요일까지 오전 9시에 실행
// @Cron('*/15 * * * *'): 매 15분마다 실행
// @Cron('0 18 * * 5'): 매주 금요일 오후 6시에 실행

// 첫 번째 필드 (0): 분 (0분)
// 두 번째 필드 (*): 시 (모든 시)
// 세 번째 필드 (*): 일 (매일)
// 네 번째 필드 (*): 월 (매월)
// 다섯 번째 필드 (*): 요일 (매일)
