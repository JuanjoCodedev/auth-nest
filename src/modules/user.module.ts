import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/core/controllers/user.controller';
import { UserEntity } from 'src/core/models/user.entity';
import { AuthService } from 'src/core/services/auth.service';
import { UserService } from 'src/core/services/user.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
