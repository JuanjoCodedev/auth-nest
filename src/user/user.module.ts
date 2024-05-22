import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { TokenStrategy } from 'src/auth/token/token.strategy';

import { UserEntity } from './user.entity';
import { UserRouteAccessEntity } from 'src/auth/user_route_access/user_route_access.entity';

import { AuthModule } from 'src/auth/auth.module';
import { RoleRouteAccessEntity } from 'src/auth/role_route_access/role_route_access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRouteAccessEntity, RoleRouteAccessEntity]), AuthModule],
  providers: [TokenStrategy, UserService],
  controllers: [UserController],
})
export class UserModule {}
