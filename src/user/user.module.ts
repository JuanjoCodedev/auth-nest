import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { TokenStrategy } from 'src/authentication/token/token.strategy';

import { UserEntity } from './user.entity';
import { UserRouteAccessEntity } from 'src/authorization/user_route_access/user_route_access.entity';
import { RoleRouteAccessEntity } from 'src/authorization/role_route_access/role_route_access.entity';

import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRouteAccessEntity, RoleRouteAccessEntity]), AuthenticationModule, AuthorizationModule],
  providers: [TokenStrategy, UserService],
  controllers: [UserController],
})
export class UserModule { }
