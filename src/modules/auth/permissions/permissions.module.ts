import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionsEntity } from './permissions.entity';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([PermissionsEntity])],
  providers: [PermissionsService],
  controllers: [PermissionsController]
})
export class PermissionsModule {}
