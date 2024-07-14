import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { GithubStrategy } from 'src/strategy/github.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '5m' },
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, NodemailerService, GoogleStrategy, GithubStrategy],
})
export class AuthModule {}
