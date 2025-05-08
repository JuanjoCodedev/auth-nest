import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';

/* Service */
import { SignInService } from './sign-in.service';

/* Dtos */
import { SignInDto } from './sign-in.dto';

@ApiTags('Autenticación')
@Controller('sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Post()
  @ApiOperation({ summary: 'Inicia sesión en la aplicación.' })
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso.', type: SignInDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async signIn(@Body() signInDto: SignInDto, @Req() req: Request) {
    return await this.signInService.signIn(signInDto, req.ip);
  }
}
