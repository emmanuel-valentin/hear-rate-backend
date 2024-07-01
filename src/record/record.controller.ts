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
  Query,
} from '@nestjs/common';

import { RecordService } from './record.service';
import { CreateRecordDto } from './dto';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @HttpCode(201)
  async createRecord(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.createRecord(createRecordDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.recordService.findAll(+page, +limit);
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
