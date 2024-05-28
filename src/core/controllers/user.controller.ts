import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/interfaces/user.interface';
import { PersonDto } from 'src/shared/dtos/person.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.MEMBER)
  @Post('recoverPassword/:id')
  async recoverPassword(@Param('id') id: number, @Body() updatePassword: PersonDto) {
    return this.userService.recoverPassword(id, updatePassword);
  }
}
