import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '@/utils/hashing.service';
import { UsersService } from '~/user/users.service';
import { User } from '@/types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const errorException = () => {
      throw new BadRequestException('用户名或密码错误');
    };
    const user = await this.userService.findOne(username);

    if (!user) {
      errorException();
    }
    // 对比密码
    const isMatch = await this.hashingService.match(password, user.password);
    if (!isMatch) {
      errorException();
    }
    // 删除密码
    delete user.password;
    return user;
  }

  async login(user: User) {
    return {
      username: user.username,
      id: user.id,
      access_token: this.jwtService.sign({
        username: user.username,
        id: user.id,
      }),
      roles: user.roles,
    };
  }
}
