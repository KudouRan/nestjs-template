import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString({ message: '用户名必须是字符串' })
  @Length(2, 20, { message: '用户名长度必须在2-16之间' })
  @ApiProperty({ example: 'admin', maxLength: 20, minLength: 6 })
  username: string;

  @IsString({ message: '密码必须是字符串' })
  @Length(6, 20, { message: '密码长度必须在6-20之间' })
  @ApiProperty({ example: '123456', maxLength: 20, minLength: 6 })
  password: string;
}
