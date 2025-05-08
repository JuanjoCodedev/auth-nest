import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

/* Service */
import { ResetPasswordService } from './reset-password.service';

/* Dtos */
import { ResetPasswordDto } from './resetPassword.dto';

/* Interface */
import { Int_Reset_Pass_Response } from './reset-pass.interface';

@ApiTags('Autenticación')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  @ApiOperation({ summary: 'Envía un correo para restablecer la contraseña.' })
  @ApiResponse({ status: 201, description: 'Correo de restablecimiento enviado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async sendPasswordResetEmail(@Body() resetDto: ResetPasswordDto): Promise<Int_Reset_Pass_Response> {
    return await this.resetPasswordService.sendPasswordResetEmail(resetDto);
  }
}
