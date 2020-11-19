import { IsEmail, IsNotEmpty, IsMongoId, MinLength, IsIn, IsString, ValidateNested } from 'class-validator';

export class OrderDto {
    correlative?: string;
    clenic?: string;
    engineer?: string;
    route?: [];
    @IsNotEmpty() @IsString() equipment: string;
    @IsNotEmpty() @IsString() description: string;
    serviceDate?: string;
}

export class UpdateOrderDto {
    description?: string;
    serviceDate?: string;
    state?: "SOLICITADO" | "PENDIENTE" | "EN PROGRESO" | "TERMINADO" | "CANCELADO";
}

export class AssignEngineerDto {
    @IsNotEmpty() @IsString() engineer: string;
}

//TODO - DISTINTOS DTOS EJ: UpdateStateDto, AsignEngineerDto ....