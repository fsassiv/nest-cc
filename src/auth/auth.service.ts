import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleRequest } from 'src/utils';
import { doVerifyPassword, generateHash } from './auth.utils';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const [error, data] = await handleRequest(
      this.prisma.user.create({
        data: {
          email: dto.email,
          hash: await generateHash(dto.password),
        },
      }),
    );

    if (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already in use');
        }
      }
      throw error;
    }
    const { hash, ...user } = data;

    return user;
  }

  async signin(dto: AuthDto) {
    const [error, data] = await handleRequest(
      this.prisma.user.findUnique({ where: { email: dto.email } }),
    );

    if (error) throw error;
    if (!data) throw new NotFoundException();

    const pwMatches = await doVerifyPassword(data.hash, dto.password);
    if (!pwMatches) throw new UnauthorizedException();

    const { hash, ...user } = data;
    return user;
  }
}
