import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: 'http://localhost:4200' })
export class WebSocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: any): void {
    console.log('Socket ejecutado');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    console.log('Usuario conectado:', client.id);
  }

  handleDisconnect(client: Socket): void {
    console.log('Usuario desconectado:', client.id);
  }
}
