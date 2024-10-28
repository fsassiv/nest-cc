import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthcoreModule } from './authcore/authcore.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthcoreModule,
    BookmarkModule,
    PrismaModule,
    AuthcoreModule,
  ],
})
export class AppModule {}
