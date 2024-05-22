import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { PinoLogger } from 'nestjs-pino';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService, PinoLogger],
  controllers: [RolesController],
})
export class RolesModule {}
