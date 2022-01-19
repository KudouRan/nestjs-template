import { Injectable } from '@nestjs/common';
import { HashingService } from '@/utils/hashing.service';

@Injectable()
export class UsersService {
  constructor(private readonly hashingService: HashingService) {}

  async findOne(username: string) {
    // 模拟数据库
    const users = [
      {
        id: '10086',
        username: 'admin',
        password: await this.hashingService.get('123456'),
        roles: ['admin'],
      },
      {
        id: '10010',
        username: 'user',
        password: await this.hashingService.get('123456'),
        roles: ['user'],
      },
    ];
    // 模拟数据库查询
    return users.find((u) => u.username === username);
  }
}
