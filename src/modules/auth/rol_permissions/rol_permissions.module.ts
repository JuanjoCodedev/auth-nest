import { forwardRef, Module } from '@nestjs/common';
import { RolPermissionsController } from './rol_permissions.controller';
import { RolPermissionsService } from './rol_permissions.service';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolPermissionsEntity } from './rol_permissions.entity';
import { RolesEntity } from '../roles/roles.entity';
import { PermissionsEntity } from '../permissions/permissions.entity';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([RolPermissionsEntity, RolesEntity, PermissionsEntity])],
  controllers: [RolPermissionsController],
  providers: [RolPermissionsService],
})
export class RolPermissionsModule {}
