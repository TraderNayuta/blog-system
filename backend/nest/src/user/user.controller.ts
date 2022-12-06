import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): string {
    console.log(loginDto);
    return 'login success!';
  }
}
