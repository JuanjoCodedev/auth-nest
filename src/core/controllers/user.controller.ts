import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ValidateDto } from 'src/shared/dtos/validate.dto';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('create-account')
  async createAccount(@Body() newAccountDto: ValidateDto) {
    return await this.userService.createAccount(newAccountDto);
  }

  @Post('login')
  async login(@Body() loginDto: ValidateDto) {
    return await this.authService.signIn(loginDto);
  }

  @Post('refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
