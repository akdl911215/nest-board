import { RedisModule } from '@liaoliaots/nestjs-redis';

const ENV = process.env.NODE_ENV === 'production'
  ? '3.35.207.45'
  : '127.0.0.1'

const PORT: number = parseInt(process.env.REDIS_PORT);

export const REDIS_MODULE = RedisModule.forRoot({
  readyLog: true,
  config: {
    host: ENV,
    port: PORT,
    // password: '',
  },
});
