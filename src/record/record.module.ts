import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecordGateway } from './record.gateway';

@Module({
  controllers: [RecordController],
  providers: [RecordService, RecordGateway],
  imports: [PrismaModule],
})
export class RecordModule {}
