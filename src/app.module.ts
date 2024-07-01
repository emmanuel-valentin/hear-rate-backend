import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [PrismaModule, RecordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
