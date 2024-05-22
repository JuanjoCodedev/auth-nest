import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EMailerService } from '../mailer/mailer.service';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { GithubStrategy } from 'src/strategy/github.strategy';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { TokensModule } from './tokens/tokens.module';
import { WithProviderModule } from './with-provider/with-provider.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolPermissionsModule } from './rol_permissions/rol_permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule.register({ defaultStrategy: 'google' }), SignInModule, SignUpModule, TokensModule, WithProviderModule, ResetPasswordModule, RolesModule, PermissionsModule, RolPermissionsModule],
  providers: [AuthService, JwtService, EMailerService, GoogleStrategy, GithubStrategy],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
