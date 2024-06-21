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
  UseGuards,
} from '@nestjs/common';

import { RecordService } from './record.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/decorators';
import { CreateRecordDto } from './dto';

@UseGuards(AuthGuard)
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @HttpCode(201)
  async createRecord(
    @User('userId') userId: number,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.recordService.createRecord(userId, createRecordDto);
  }

  @Get()
  async findAll(
    @User('userId') userId: number,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.recordService.findAll(userId, +page, +limit);
  }

  @Get(':recordId')
  async findById(
    @User('userId') userId: number,
    @Param('recordId', ParseIntPipe) recordId: number,
  ) {
    return this.recordService.findById(userId, recordId);
  }

  @Put(':recordId')
  async updateRecord(
    @User('userId') userId: number,
    @Param('recordId', ParseIntPipe) recordId: number,
    @Body() updateRecordDto: CreateRecordDto,
  ) {
    return this.recordService.updateRecord(userId, recordId, updateRecordDto);
  }

  @Delete(':recordId')
  @HttpCode(204)
  async deleteRecord(
    @User('userId') userId: number,
    @Param('recordId', ParseIntPipe) recordId: number,
  ) {
    return this.recordService.deleteRecord(userId, recordId);
  }
}
