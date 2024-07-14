import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/interfaces/user.interface';
import { UpdatePasswordDto } from 'src/shared/dtos/person.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.MEMBER)
  @Patch('recoverPassword/:id')
  async recoverPassword(@Param('id') id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.recoverPassword(id, updatePasswordDto);
  }
}
