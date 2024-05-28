import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/core/controllers/user.controller';
import { UserEntity } from 'src/core/models/user.entity';
import { AuthService } from 'src/core/services/auth.service';
import { NodemailerService } from 'src/core/services/nodemailer.service';
import { UserService } from 'src/core/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [AuthService, NodemailerService, UserService],
})
export class UserModule {}
