import { Module, forwardRef } from '@nestjs/common';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { AuthService } from '../auth.service';
import { PinoLogger } from 'nestjs-pino';
import { TokensService } from '../tokens/tokens.service';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { EMailerService } from 'src/modules/mailer/mailer.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([UserEntity])],
  providers: [SignInService, AuthService, PinoLogger, TokensService, EMailerService],
  controllers: [SignInController],
})
export class SignInModule {}
