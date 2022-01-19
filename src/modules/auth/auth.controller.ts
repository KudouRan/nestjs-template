import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserReq } from '@/decorators/users.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@/types';

@Controller('auth')
@ApiTags('权限验证')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _loginUserDto: LoginUserDto, @UserReq() user: User) {
    return this.authService.login(user);
  }
}
