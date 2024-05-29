import { RedisModule } from '@liaoliaots/nestjs-redis';

const HOST = process.env.NODE_ENV === 'production'
  ? '3.35.207.45'
  : '127.0.0.1'
console.log('redis config HOST : ', HOST);

const PORT: number = parseInt(process.env.REDIS_PORT, 10);
console.log('redis config PORT : ', PORT);

export const REDIS_MODULE = RedisModule.forRoot({
  readyLog: true,
  config: {
    host: '127.0.0.1',
    port: PORT,
    // password: '',
  },
});
