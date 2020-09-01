import { ApiProperty } from '@nestjs/swagger';
import { IPosition, IUserPersonalInformation, IUserSession } from 'src/utils/types';

export class LoginUserDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
}

export class UserDto {

  @ApiProperty()
  readonly _id?: string;

  @ApiProperty()
  readonly identifier?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  position?: IPosition;

  @ApiProperty()
  state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE";

  @ApiProperty()
  personalInformation?: IUserPersonalInformation;

  @ApiProperty()
  sessions?: [IUserSession];

  @ApiProperty()
  readonly role?: string;
}
