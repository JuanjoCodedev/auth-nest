import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: 'http://localhost:4200' })
export class WebSocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  /**
   * ?Método que se ejecuta después de que el servidor WebSocket se ha inicializado.
   *
   * *@param {Server} server - Instancia del servidor WebSocket.
   */
  afterInit(server: any) {
    console.log('Esto se ejecuta cuando inicia');
  }

  /**
   * ?Método que se ejecuta cuando un cliente se conecta al servidor WebSocket.
   *
   * *@param {Socket} client - Instancia del cliente que se ha conectado.
   * *@param {...any[]} args - Argumentos adicionales que pueden ser pasados durante la conexión.
   */
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Usuario conectado', client.id);
  }

  /**
   * ?Método que se ejecuta cuando un cliente se desconecta del servidor WebSocket.
   *
   * *@param {Socket} client - Instancia del cliente que se ha desconectado.
   */
  handleDisconnect(client: Socket) {
    console.log('Usuario desconectado', client.id);
  }
}
