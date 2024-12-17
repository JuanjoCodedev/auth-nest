import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordService } from './reset-password.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDto } from './resetPassword.dto';

@ApiTags('Autenticación')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('sendPasswordReset')
  @ApiOperation({ summary: 'Envía un correo para restablecer la contraseña.' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 201, description: 'Correo de restablecimiento enviado.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  async sendPasswordResetEmail(@Body() resetDto: ResetPasswordDto) {
    return await this.resetPasswordService.sendPasswordResetEmail(resetDto);
  }
}
