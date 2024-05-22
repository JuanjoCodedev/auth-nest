import { forwardRef, Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { AuthService } from '../auth.service';
import { TokensService } from '../tokens/tokens.service';
import { EMailerService } from 'src/modules/mailer/mailer.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([UserEntity])],
  providers: [ResetPasswordService, AuthService, TokensService, EMailerService],
  controllers: [ResetPasswordController]
})
export class ResetPasswordModule {}
