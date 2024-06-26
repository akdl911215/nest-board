import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

const CONFIG_MODULE = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

export default CONFIG_MODULE;
