import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

/* Service */
import { SignUpService } from './sign-up.service';

/* dtos */
import { SignUpDto } from './sign-up.dto';

@ApiTags('Autenticación')
@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) { }

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
