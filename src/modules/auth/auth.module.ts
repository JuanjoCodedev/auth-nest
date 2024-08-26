import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EMailerService } from '../mailer/mailer.service';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { GithubStrategy } from 'src/strategy/github.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRED_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, EMailerService, GoogleStrategy, GithubStrategy],
  exports: [JwtService],
})
export class AuthModule {}
