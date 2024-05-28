import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/core/controllers/auth.controller';
import { UserEntity } from 'src/core/models/user.entity';
import { AuthService } from 'src/core/services/auth.service';
import { NodemailerService } from 'src/core/services/nodemailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, NodemailerService],
})
export class AuthModule {}
