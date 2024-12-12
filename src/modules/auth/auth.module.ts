import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

/* Module */
import { WithProviderModule } from './with-provider/with-provider.module';

/* Entity */
import { UserEntity } from '../user/user.entity';
import { RolesEntity } from './roles/roles.entity';
import { RolPermissionsEntity } from './rol_permissions/rol_permissions.entity';
import { PermissionsEntity } from './permissions/permissions.entity';

/* Strategy */
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { GithubStrategy } from 'src/strategy/github.strategy';

/* Service */
import { AuthService } from './auth.service';
import { EMailerService } from '../mailer/mailer.service';
import { SignInService } from './sign-in/sign-in.service';
import { SignUpService } from './sign-up/sign-up.service';
import { RolesService } from './roles/roles.service';
import { RolPermissionsService } from './rol_permissions/rol_permissions.service';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { PermissionsService } from './permissions/permissions.service';
import { TokensService } from './tokens/tokens.service';

/* Controller */
import { SignInController } from './sign-in/sign-in.controller';
import { SignUpController } from './sign-up/sign-up.controller';
import { RolesController } from './roles/roles.controller';
import { ResetPasswordController } from './reset-password/reset-password.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { TokensController } from './tokens/tokens.controller';
import { RolPermissionsController } from './rol_permissions/rol_permissions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RolesEntity, RolPermissionsEntity, PermissionsEntity]),
    PassportModule.register({ defaultStrategy: 'google' }),
    WithProviderModule,
  ],
  providers: [
    AuthService,
    JwtService,
    EMailerService,
    GoogleStrategy,
    GithubStrategy,
    SignInService,
    SignUpService,
    RolesService,
    RolPermissionsService,
    ResetPasswordService,
    PermissionsService,
    TokensService,
  ],
  controllers: [SignInController, SignUpController, RolesController, RolPermissionsController, ResetPasswordController, PermissionsController, TokensController],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
