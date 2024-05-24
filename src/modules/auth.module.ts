import { AuthService, UserEntity, UserService } from '@/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1m' },
    }),
  ],

  providers: [AuthService, UserService],
})
export class AuthModule {}
