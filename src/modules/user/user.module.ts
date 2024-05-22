import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMailerService } from '../mailer/mailer.service';
import { AuthService } from '../auth/auth.service';
import { EMailerModule } from '../mailer/mailer.module';
import { AuthModule } from '../auth/auth.module';
import { TokensService } from '../auth/tokens/tokens.service';
import { RolesService } from '../auth/roles/roles.service';
import { RolesEntity } from '../auth/roles/roles.entity';
import { RolPermissionsEntity } from '../auth/rol_permissions/rol_permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity, RolPermissionsEntity]), EMailerModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService, EMailerService, TokensService, RolesService],
})
export class UserModule {}
