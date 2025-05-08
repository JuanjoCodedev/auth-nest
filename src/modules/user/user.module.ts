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
import { AccessLevelService } from '../auth/access-level/access-level.service';

/* Entity */
import { AccessLevelEntity } from '../auth/access-level/access-level.entity';
import { AccessLevelRouteAccessEntity } from '../auth/access-level_route-access/access-level_route-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccessLevelEntity, AccessLevelRouteAccessEntity]), EMailerModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService, EMailerService, TokensService, AccessLevelService],
})
export class UserModule {}
