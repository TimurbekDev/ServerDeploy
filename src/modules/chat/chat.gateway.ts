import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('newMessage')
  async handleNewMessage(
    @MessageBody() message: { username: string; text: string; timestamp: string },
  ) {
    await this.chatService.saveMessage(message);

    this.server.emit('messageBroadcast', message);
  }

  handleConnection(@ConnectedSocket() client: Socket) {

    this.chatService.getAllMessages().then((messages) => {
      client.emit('allMessages', messages);
    });
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, username: string) {
    client.broadcast.emit('userTyping', username);
  }
}
