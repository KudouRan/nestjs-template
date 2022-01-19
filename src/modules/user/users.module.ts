import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashingService } from '@/utils/hashing.service';

@Module({
  providers: [UsersService, HashingService],
  exports: [UsersService], // 外部可以使用
})
export class UsersModule {}
