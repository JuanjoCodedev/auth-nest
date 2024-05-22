import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthenticationService } from './authentication.service';

import { AuthenticationForgotPasswordDto, AuthenticationResetPasswordDto, AuthenticationSignInDto } from './authentication.dto';
import { UserDto } from 'src/user/user.dto';

import { Authentication } from './authentication.interface';

@ApiTags('Autenticación')
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly _authService: AuthenticationService) { }

    @Post('sign-in')
    public async signIn(@Body() body: AuthenticationSignInDto): Promise<Authentication.SignInResponse> {
        return this._authService.signIn(body);
    }

    @Post('sign-up')
    public async signUp(@Body() body: UserDto): Promise<Authentication.SignUpResponse> {
        return this._authService.signUp(body);
    }

    @Post('forgot-password')
    public async forgotPassword(@Body() body: AuthenticationForgotPasswordDto) {
        return this._authService.forgotPassword(body);
    }

    @Post('reset-password')
    public async resetPassword(@Body() body: AuthenticationResetPasswordDto) {
        return this._authService.resetPassword(body);
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
