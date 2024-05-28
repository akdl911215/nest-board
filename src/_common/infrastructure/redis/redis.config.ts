import { RedisModule } from '@liaoliaots/nestjs-redis';

export const REDIS_MODULE = RedisModule.forRoot({
  readyLog: true,
  config: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    // password: '',
  },
});
