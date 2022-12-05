import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() loginDto: LoginDto): string {
    console.log(loginDto);
    return 'login success!';
  }
}
