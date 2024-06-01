import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/core/controllers/auth.controller';
import { UserEntity } from 'src/core/models/user.entity';
import { AuthService } from 'src/core/services/auth.service';
import { NodemailerService } from 'src/core/services/nodemailer.service';
import { GithubStrategy } from 'src/strategy/github.strategy';
import { GoogleStrategy } from 'src/strategy/google.strategy';

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
