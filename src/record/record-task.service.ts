import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CreateRecordDto } from './dto';
import { RecordGateway } from './record.gateway';
import { measurement } from './var/lastRecord';

@Injectable()
export class RecordTaskService {
  constructor(private eventsGateway: RecordGateway) {}

  public updateRecord(record: CreateRecordDto) {
    // Emitir un evento cada vez que se actualiza el registro
    this.eventsGateway.emit('measurement', measurement.record);
  }

  @Interval(500)
  public handleMeasurement() {
    // Aquí puedes emitir eventos periódicamente si es necesario
    this.eventsGateway.emit('measurement', measurement.record);
  }
}
