import { Body, Controller, Post } from '@nestjs/common';
import { ValidateDto } from '@/shared';
import { AuthService, UserService } from '../services';

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
