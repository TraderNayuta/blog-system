import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { LoginDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.checkLoginForm(loginDto);
    const token = await this.certificate(user);
    return token;
  }

  async checkLoginForm(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;

    const user = await this.findUser(username);

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new BadRequestException('密码错误');
    }

    return user;
  }

  async findUser(username: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
  }

  async certificate(user: User): Promise<string> {
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
