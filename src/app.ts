import { AuthModule, ChatModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { cwd } from 'process';
import { PrismaModule } from './prisma';
import { ExceptionHandlerFilter } from './filters';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ChatModule,
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(cwd(), 'src', 'client'),
      serveRoot:'/static'
    }),
    PrismaModule
  ],
  controllers: [],
  providers: [
    {
      useClass:ExceptionHandlerFilter,
      provide: APP_FILTER
    }
  ],
})
export class AppModule {}
