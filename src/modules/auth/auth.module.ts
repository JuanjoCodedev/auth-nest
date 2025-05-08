import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

/* Module */
import { WithProviderModule } from './with-provider/with-provider.module';

/* Entity */
import { UserEntity } from '../user/user.entity';
import { AccessLevelEntity } from './access-level/access-level.entity';
import { AccessLevelRouteAccessEntity } from './access-level_route-access/access-level_route-access.entity';
import { RouteAccessEntity } from './route-access/route-access.entity';

/* Strategy */
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { GithubStrategy } from 'src/strategy/github.strategy';

/* Service */
import { AuthService } from './auth.service';
import { EMailerService } from '../mailer/mailer.service';
import { SignInService } from './sign-in/sign-in.service';
import { SignUpService } from './sign-up/sign-up.service';
import { AccessLevelService } from './access-level/access-level.service';
import { AccessLevelRouteAccess } from './access-level_route-access/access-level_route-access.service';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { RouteAccessService } from './route-access/route-access.service';
import { TokensService } from './tokens/tokens.service';

/* Controller */
import { SignInController } from './sign-in/sign-in.controller';
import { SignUpController } from './sign-up/sign-up.controller';
import { AcessLevelController } from './access-level/access-level.controller';
import { ResetPasswordController } from './reset-password/reset-password.controller';
import { RouteAccessController } from './route-access/route-access.controller';
import { TokensController } from './tokens/tokens.controller';
import { AccessLevelRouteAccessController } from './access-level_route-access/access-level_route-access.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccessLevelEntity, AccessLevelRouteAccessEntity, RouteAccessEntity]),
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
    AccessLevelService,
    AccessLevelRouteAccess,
    ResetPasswordService,
    RouteAccessService,
    TokensService,
  ],
  controllers: [SignInController, SignUpController, AcessLevelController, AccessLevelRouteAccessController, ResetPasswordController, RouteAccessController, TokensController],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
