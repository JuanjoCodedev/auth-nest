import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserEntity } from 'src/user/user.entity';
import { RouteAccessEntity } from './route_access/route_access.entity';

import { AuthController } from './auth.controller';
import { RouteAccessController } from './route_access/route_access.controller';

import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { RouteAccessService } from './route_access/route_access.service';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RouteAccessEntity]), PassportModule],
  providers: [AuthService, JwtService, TokenService, RouteAccessService, GoogleStrategy],
  controllers: [AuthController, RouteAccessController],
  exports: [TokenService],
})
export class AuthModule {}
