import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './user.service';
import { LoginDto } from './user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'nayuta',
    });
  }

  async validate(payload: Partial<LoginDto>) {
    const { username } = payload;
    const user = await this.userService.findUser(username);

    if (!user) {
      throw new UnauthorizedException('User Not Found!');
    }

    return user;
  }
}
