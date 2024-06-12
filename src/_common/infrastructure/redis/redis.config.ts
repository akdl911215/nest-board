// redis.config.ts
import Redis from 'ioredis';
import { Provider } from '@nestjs/common';

const REDIS_HOST: string = process.env.REDIS_HOST;
console.log('redis config REDIS_HOST : ', REDIS_HOST);

const REDIS_PORT: number = parseInt(process.env.REDIS_PORT, 10);
console.log('redis config PORT : ', REDIS_PORT);

const REDIS_MODULE = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

export const RedisProvider: Provider = {
  provide: 'REDIS_MODULE',
  useValue: REDIS_MODULE,
};

// import { RedisModule } from '@liaoliaots/nestjs-redis';
//
// // const HOST = process.env.NODE_ENV === 'production'
// //   ? '3.35.207.45'
// //   : '127.0.0.1'
// const HOST: string = process.env.REDIS_HOST;
// console.log('redis config HOST : ', HOST);
//
// const PORT: number = parseInt(process.env.REDIS_PORT, 10);
// console.log('redis config PORT : ', PORT);
//
// export const REDIS_MODULE = RedisModule.forRoot({
//   readyLog: true,
//   config: {
//     host: HOST,
//     port: PORT,
//     // password: '',
//   },
// });
