import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserEntity } from 'src/user/user.entity';
import { UserRouteAccessEntity } from './user_route_access/user_route_access.entity';
import { RoleEntity } from './role/role.entity';
import { RoleRouteAccessEntity } from './role_route_access/role_route_access.entity';

import { AuthController } from './auth.controller';
import { UserRouteAccessController } from './user_route_access/user_route_access.controller';
import { RoleController } from './role/role.controller';
import { RoleRouteAccessController } from './role_route_access/role_route_access.controller';

import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { UserRouteAccessService } from './user_route_access/user_route_access.service';
import { RoleService } from './role/role.service';
import { RoleRouteAccessService } from './role_route_access/role_route_access.service';

import { GoogleStrategy } from './strategy/google.strategy';

import { UserRouteAccessGuard } from './user_route_access/user_route_access.guard';
import { RoleAccessGuard } from './role_route_access/role_route_access.guard';
import { AuthAccessGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRouteAccessEntity, RoleEntity, RoleRouteAccessEntity]), PassportModule],
  providers: [AuthService, JwtService, TokenService, UserRouteAccessService, GoogleStrategy, RoleService, RoleRouteAccessService, AuthAccessGuard, UserRouteAccessGuard, RoleAccessGuard],
  controllers: [AuthController, UserRouteAccessController, RoleController, RoleRouteAccessController],
  exports: [TokenService, AuthAccessGuard, UserRouteAccessGuard, RoleAccessGuard],
})
export class AuthModule {}
