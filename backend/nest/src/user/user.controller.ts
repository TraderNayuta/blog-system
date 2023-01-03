import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from './user.dto';
import { UserService } from './user.service';
import { Response } from 'src/common.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  @Header('content-type', 'text/plain')
  async login(@Body() loginDto: LoginDto): Promise<Response> {
    const token = await this.userService.login(loginDto);
    return {
      data: token,
      msg: 'login success!',
    };
  }
}
