import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecord(userId: number, createRecordDto: CreateRecordDto) {
    const payload = {
      ...createRecordDto,
      userId,
    };
    return this.prismaService.heartRateRecord.create({
      data: payload,
    });
  }

  async findAll(userId: number, page: number, limit: number) {
    return this.prismaService.heartRateRecord.findMany({
      where: { userId },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findById(userId: number, recordId: number) {
    const record = await this.prismaService.heartRateRecord.findUnique({
      where: { recordId, userId },
    });
    if (!record) {
      throw new NotFoundException('Registro no encontrado');
    }
    return record;
  }

  async updateRecord(
    userId: number,
    recordId: number,
    updateRecordDto: CreateRecordDto,
  ) {
    return this.prismaService.heartRateRecord.update({
      where: { recordId, userId },
      data: updateRecordDto,
    });
  }

  async deleteRecord(userId: number, recordId: number) {
    this.prismaService.heartRateRecord.delete({
      where: { recordId, userId },
    });
    return;
  }
}
