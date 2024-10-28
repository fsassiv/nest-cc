import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authcore/auth/auth.module';
import { UserModule } from 'src/authcore/user/user.module';

@Module({ imports: [AuthModule, UserModule] })
export class AuthcoreModule {}
