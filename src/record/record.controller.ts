import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { RecordService } from './record.service';
import { CreateRecordDto } from './dto';
import { RecordTaskService } from './record-task.service';
import { RecordGateway } from './record.gateway';
import { measurement } from './var/lastRecord';

@Controller('records')
export class RecordController {
  constructor(
    private readonly recordService: RecordService,
    private eventsGateway: RecordGateway
  ) {}

  @Post()
  @HttpCode(201)
  async createRecord(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.createRecord(createRecordDto);
  }

  @Get()
  async findAll() {
    return this.recordService.findAll();
  }

  @Get('measurement')
  async measurement(@Body() createRecordDto: CreateRecordDto) {
    measurement.record = createRecordDto;
    return this.eventsGateway.emit('measurement', createRecordDto);
  }

  @Get(':recordId')
  async findById(@Param('recordId', ParseIntPipe) recordId: number) {
    return this.recordService.findById(recordId);
  }

  @Put(':recordId')
  async updateRecord(
    @Param('recordId', ParseIntPipe) recordId: number,
    @Body() updateRecordDto: CreateRecordDto,
  ) {
    return this.recordService.updateRecord(recordId, updateRecordDto);
  }

  @Delete(':recordId')
  @HttpCode(204)
  async deleteRecord(@Param('recordId', ParseIntPipe) recordId: number) {
    return this.recordService.deleteRecord(recordId);
  }
}
