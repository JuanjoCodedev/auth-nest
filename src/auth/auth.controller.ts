import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { AuthSignInDto } from './auth.dto';
import { UserDto } from 'src/user/user.dto';
import { Auth } from './auth.interface';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  public async signIn(@Body() body: AuthSignInDto): Promise<Auth.SignInResponse> {
    return this._authService.signIn(body);
  }

  @Post('sign-up')
  public async signUp(@Body() body: UserDto): Promise<Auth.SignUpResponse> {
    return this._authService.signUp(body);
  }

  @Get('google/sign-in')
  @UseGuards(AuthGuard('google'))
  handleGoogleLogin() {
    // Esto no se ejecuta directamente, se redirige a Google automáticamente
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  public handleGoogleRedirect(@Req() req: any) {
    return { message: 'Authenticated with Google!', user: req.user };
  }
}
