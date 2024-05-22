import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from 'src/user/user.entity';

import { GoogleStrategy } from './strategy/google.strategy';

import { AuthenticationController } from './authentication.controller';

import { AuthenticationService } from './authentication.service';
import { TokenService } from './token/token.service';
import { EmailerService } from 'src/emailer/emailer.service';

import { AuthorizationModule } from 'src/authorization/authorization.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthorizationModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenService, JwtService, GoogleStrategy, EmailerService],
  exports: [TokenService],
})
export class AuthenticationModule { }
