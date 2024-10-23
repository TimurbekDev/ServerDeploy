import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@prisma';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[PrismaModule],
  exports : [UserService]
})
export class UserModule {}
