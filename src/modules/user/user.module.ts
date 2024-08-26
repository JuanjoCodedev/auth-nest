import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMailerService } from '../mailer/mailer.service';
import { AuthService } from '../auth/auth.service';
import { EMailerModule } from '../mailer/mailer.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EMailerModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService, EMailerService],
})
export class UserModule {}
