import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { TokenStrategy } from 'src/auth/token/token.strategy';

import { UserEntity } from './user.entity';
import { RouteAccessEntity } from 'src/auth/route_access/route_access.entity';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RouteAccessEntity]), AuthModule],
  providers: [TokenStrategy, UserService],
  controllers: [UserController],
})
export class UserModule {}
