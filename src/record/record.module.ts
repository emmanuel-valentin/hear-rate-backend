import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [PrismaModule],
})
export class RecordModule {}
