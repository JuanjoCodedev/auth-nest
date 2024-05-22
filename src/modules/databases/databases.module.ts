import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './databases.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DatabaseService })],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
