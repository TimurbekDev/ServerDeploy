import { forwardRef, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaModule } from '@prisma';

@Module({
  providers: [ChatGateway,ChatService],
  imports: [PrismaModule]
})
export class ChatModule {}
