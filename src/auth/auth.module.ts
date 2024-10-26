import { Module } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // imports: [PrismaService],
})
export class AuthModule {}
