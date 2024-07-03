import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecord(createRecordDto: CreateRecordDto) {
    return this.prismaService.heartRateRecord.create({
      data: { ...createRecordDto },
    });
  }

  async findAll() {
    return this.prismaService.heartRateRecord.findMany();
  }

  async findById(recordId: number) {
    const record = await this.prismaService.heartRateRecord.findUnique({
      where: { recordId },
    });
    if (!record) {
      throw new NotFoundException('Registro no encontrado');
    }
    return record;
  }

  async updateRecord(recordId: number, updateRecordDto: CreateRecordDto) {
    return this.prismaService.heartRateRecord.update({
      where: { recordId },
      data: updateRecordDto,
    });
  }

  async deleteRecord(recordId: number) {
    this.prismaService.heartRateRecord.delete({
      where: { recordId },
    });
    return;
  }
}
