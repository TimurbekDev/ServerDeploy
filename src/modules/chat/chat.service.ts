import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ChatService {
    constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async saveMessage(data: { username: string; text: string; timestamp: string }) {
    return this.prisma.message.create({
      data: {
        username: data.username,
        text: data.text,
        timestamp: new Date(data.timestamp),
      },
    });
  }

  async getAllMessages() {
    return this.prisma.message.findMany({
      orderBy: { timestamp: 'asc' }
    });
  }
}
