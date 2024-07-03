import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RecordModule } from './record/record.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RecordTaskService } from './record/record-task.service';
import { RecordGateway } from './record/record.gateway';

@Module({
  imports: [
    PrismaModule,
    RecordModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [RecordTaskService, RecordGateway],
})
export class AppModule {}
