import { IsEmail, IsNotEmpty, IsMongoId, MinLength, IsIn, IsString, ValidateNested } from 'class-validator';

export class EquipmentDto {
    @IsNotEmpty() @IsString() name: string;
    @IsNotEmpty() @IsString() brand: string;
    @IsNotEmpty() @IsString() serial: string;
    manufacturing?: string;
}

export class DeleteEquipmentImageDto {
    @IsString() @IsNotEmpty() url: string;
}
//TODO - DISTINTOS DTOS 
//EJ: UpdateEquipment (o en su defecto si es una entidad simple como esta solo sería necesario el dto principal)