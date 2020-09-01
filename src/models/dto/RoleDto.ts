import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {

    @ApiProperty()
    readonly _id?: string;

    @ApiProperty()
    readonly name?: string;

    @ApiProperty()
    readonly active?: boolean;

}