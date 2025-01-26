import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/* Service */
import { TokensService } from './tokens.service';

/* Interface */
import { Int_Tokens_Response } from './tokens.interface';

@ApiTags('Autenticación')
@Controller('token')
export class TokensController {
  constructor(private readonly tokensService: TokensService) { }

  @Post('refreshToken')
  @ApiOperation({ summary: 'Renueva el token de acceso.' })
  @ApiBody({ type: String, required: true, description: 'Token de actualización.' })
  @ApiResponse({ status: 201, description: 'Token de acceso renovado.' })
  @ApiResponse({ status: 401, description: 'Token de actualización inválido.' })
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<Int_Tokens_Response> {
    return this.tokensService.refreshToken(refreshToken);
  }
}
