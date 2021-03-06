import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { configuration, Configuration } from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '~/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        `.env.${NODE_ENV}.local`,
        `.env.${NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      load: [configuration],
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (conifg: ConfigService<Configuration>) => ({
        ttl: 60,
        limit: conifg.get('rateLimitMax'),
        storage: conifg.get('REDIS_DISABLE')
          ? null
          : new ThrottlerStorageRedisService(),
      }),
    }),
    AuthModule,
  ],
  providers: [
    {
      /** 节流器 */
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
