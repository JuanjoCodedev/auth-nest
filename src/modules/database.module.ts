import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnService } from '../core/services/conn.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: ConnService })],
  providers: [ConnService],
  exports: [ConnService],
})
export class DatabaseModule {}
