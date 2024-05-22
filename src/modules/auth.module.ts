import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/models/user.entity';
import { AuthService } from 'src/core/services/auth.service';
import { UserService } from 'src/core/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: `${process.env.TOKEN_KEY}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],

  providers: [AuthService, UserService],
})
export class AuthModule {}
