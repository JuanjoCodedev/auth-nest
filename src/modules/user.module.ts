import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService, UserController, UserEntity, UserService } from '@/core';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
