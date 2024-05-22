import { Module, forwardRef } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { AuthService } from '../auth.service';
import { PinoLogger } from 'nestjs-pino';
import { TokensService } from '../tokens/tokens.service';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { SignUpController } from './sign-up.controller';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([UserEntity])],
  providers: [SignUpService, AuthService, PinoLogger, TokensService],
  controllers: [SignUpController],
})
export class SignUpModule {}
