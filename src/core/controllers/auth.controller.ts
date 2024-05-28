import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonDto } from 'src/shared/dtos/person.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async createAccount(@Body() signUpDto: PersonDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('signIn')
  async signIn(@Body() signInDto: PersonDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('sendPasswordReset')
  async sendPasswordResetEmail(@Body() resetDto: PersonDto) {
    return await this.authService.sendPasswordResetEmail(resetDto);
  }
}
