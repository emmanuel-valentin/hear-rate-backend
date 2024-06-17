import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard } from './auth/auth.guard';
import { RecordModule } from './record/record.module';

@Module({
  imports: [AuthModule, PrismaModule, RecordModule],
  controllers: [],
  providers: [
    {
      provide: 'AUTH_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
