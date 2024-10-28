import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/authcore/auth/decorator';
import { JwtGuard } from 'src/authcore/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser('') user: User) {
    return user;
  }
}
