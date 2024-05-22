import { Body, Controller, Post, Req } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { Request } from 'express';

@ApiTags('Autenticación')
@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  /**
   * ?Crea una nueva cuenta de usuario.
   *
   * *@param signUpDto - Datos del usuario para la creación de la cuenta.
   * *@param req - Objeto de solicitud para obtener información adicional, como la dirección IP.
   * *@returns - Retorna un objeto con los datos creados incluyendo la dirección IP.
   */
  @Post('signUp')
  @ApiOperation({ summary: 'Crea una nueva cuenta de usuario.' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'Cuenta creada con éxito.', type: SignUpDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async createAccount(@Body() signUpDto: SignUpDto, @Req() req: Request) {
    const ipAddress = req.ip;
    return await this.signUpService.signUp(signUpDto, ipAddress);
  }
}
