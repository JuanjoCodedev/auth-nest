import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { AuthService } from '../auth/auth.service';
import { NodemailerModule } from '../nodemailer/nodemailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), NodemailerModule],
  controllers: [UserController],
  providers: [UserService, AuthService, NodemailerService],
})
export class UserModule {}
