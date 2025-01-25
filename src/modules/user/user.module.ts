import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Controller */
import { UserController } from './user.controller';

/* Entity */
import { UserEntity } from './user.entity';

/* Module */
import { EMailerModule } from '../mailer/mailer.module';
import { AuthModule } from '../auth/auth.module';

/* Service */
import { UserService } from './user.service';
import { EMailerService } from '../mailer/mailer.service';
import { AuthService } from '../auth/auth.service';
import { TokensService } from '../auth/tokens/tokens.service';
import { RolesService } from '../auth/roles/roles.service';

/* Entity */
import { RolesEntity } from '../auth/roles/roles.entity';
import { RolPermissionsEntity } from '../auth/rol_permissions/rol_permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity, RolPermissionsEntity]), EMailerModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService, EMailerService, TokensService, RolesService],
})
export class UserModule {}
