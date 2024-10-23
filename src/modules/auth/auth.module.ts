import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { GoogleStrategy } from './strategies';
import { PrismaService } from '@prisma';

@Module({
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,PrismaService],
  imports : [
    forwardRef(()=>UserModule)
  ]
})
export class AuthModule {}
