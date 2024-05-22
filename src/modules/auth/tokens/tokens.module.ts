import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([UserEntity])],
  providers: [TokensService, JwtService, AuthService],
  controllers: [TokensController],
  exports: [TokensService],
})
export class TokensModule {}
