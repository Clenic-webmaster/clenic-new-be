import { ApiProperty } from '@nestjs/swagger'; //FOR SWAGGER
import { IPosition, IUserSession } from 'src/utils/types';
import { IsEmail, IsNotEmpty, IsMongoId, MinLength, IsIn, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { security } from 'src/utils/constants/security';

export class LoginUserDto {
  @IsNotEmpty() @IsString() readonly username: string;
  @IsNotEmpty() @IsString() readonly password: string;
  @IsNotEmpty() @IsString() readonly companyIdentifier: string;
}

export class LogoutUserDto {
  @IsNotEmpty() @IsString() readonly sessionToken: string;
}

export class UserBussinessInformationDto {
  user?: string;
  serviceEntity?: string;
  @IsIn([security.bussinessTypes.COMPANY, security.bussinessTypes.CLENIC]) type?: 'EMPRESA_MANTENIMIENTO' | 'CLENIC';
  @IsNotEmpty() @IsString() name?: string;
  @IsNotEmpty() @IsString() address?: string;
  engineers?: [];
  clenics?: [];
  orders: [];
  equipments: [];
}

class UserPersonalInformationDto {
  @IsNotEmpty() @IsString() firstName?: string;
  @IsNotEmpty() @IsString() lastName?: string;
  @IsNotEmpty() birthday?: Date;
  @IsNotEmpty() createdAt?: Date;
  imageProfile?: string;
  active?: boolean;
}


export class RegisterUserAdminDto {
  identifier?: string;
  @IsEmail() @IsNotEmpty() email?: string;
  @IsNotEmpty() @MinLength(5) @IsString() password?: string;
  position: IPosition;
  state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE" | "BLOQUEADO";
  sessions: [];
  role?: string;
  @IsNotEmpty() @ValidateNested() @Type(() => UserPersonalInformationDto) personalInformation?: UserPersonalInformationDto;
  @IsNotEmpty() @ValidateNested() @Type(() => UserBussinessInformationDto) bussiness?: UserBussinessInformationDto;
}

export class RegisterUserClenicDto {
  identifier?: string;
  companyIdentifier?: string;
  @IsEmail() @IsNotEmpty() email?: string;
  @IsNotEmpty() @MinLength(5) @IsString() password?: string;
  position: IPosition;
  state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE" | "BLOQUEADO";
  sessions: [];
  role?: string;
  @IsNotEmpty() @ValidateNested() @Type(() => UserPersonalInformationDto) personalInformation?: UserPersonalInformationDto;
  @IsNotEmpty() @ValidateNested() @Type(() => UserBussinessInformationDto) bussiness?: UserBussinessInformationDto;
}

export class RegisterUserEngineerDto {
  identifier?: string;
  companyIdentifier?: string;
  @IsEmail() @IsNotEmpty() email?: string;
  @IsNotEmpty() @MinLength(5) @IsString() password?: string;
  position: IPosition;
  state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE" | "BLOQUEADO";
  sessions: [];
  role?: string;
  @IsNotEmpty() @ValidateNested() @Type(() => UserPersonalInformationDto) personalInformation?: UserPersonalInformationDto;
}

export class UserDto {

  readonly _id?: string;
  readonly identifier?: string;
  readonly companyIdentifier?: string;
  email?: string;
  password?: string;
  position?: IPosition;
  state?: "INACTIVO" | "VACACIONES" | "EN RUTA" | "DISPONIBLE" | "BLOQUEADO";
  personalInformation?: UserPersonalInformationDto;
  sessions?: [IUserSession];
  bussiness?: string;
  readonly role?: string;

}

export class JWTPayloadDto {
  userId: string;
  bussinessId?: string;
  identifier?: string;
  companyIdentifier?: string;
  role: {
    _id: string;
    name: string;
    active: boolean;
  }
}

