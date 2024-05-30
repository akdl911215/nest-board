// redis.config.ts
import Redis from 'ioredis';
import { Provider } from '@nestjs/common';

const HOST: string = process.env.REDIS_HOST;
console.log('redis config HOST : ', HOST);

const PORT: number = parseInt(process.env.REDIS_PORT, 10);
console.log('redis config PORT : ', PORT);

const REDIS_MODULE = new Redis({
  host: HOST,
  port: PORT,
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
