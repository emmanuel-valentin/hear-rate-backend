import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreateRecordDto } from './dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RecordGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('measurement')
  async handleMessage(record: CreateRecordDto): Promise<CreateRecordDto> {
    console.log('Received record:', record);
    return record;
  }

  public emit(message: string, data: CreateRecordDto) {
    this.server.emit(message, data);
  }
}
