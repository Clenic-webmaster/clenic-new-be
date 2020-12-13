import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteEquipmentImageDto, EquipmentDto, JWTPayloadDto } from 'src/models/dto';
import { ErrorHandler } from 'src/utils/errors';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorators';
import { security } from 'src/utils/constants/security';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('equipment')
export class EquipmentController {
    //Equipment Controller
    //TypeScript
    constructor(private readonly _equipmentService: EquipmentService) { }

    @Get('/list')
    async getEquipments() {
        const equipment = this._equipmentService.getEquipments();
        return equipment;
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Put('update/:id')
    async updateEquipmentBasicInformation(@Body() equipmentBody: EquipmentDto, @Param('id') id: string) {
        const equipment = await this._equipmentService.updateEquipment(id, equipmentBody);
        if (equipment) {
            return {
                message: "El equipo médico ha sido actualizado con éxito"
            }
        } else {
            throw ErrorHandler.throwDefaultInternalServerError();
        }
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Post('addNewEquipmentImage/:equipmentId')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('image'))
    async addNewCatalogueImage(@UploadedFile() image, @Param('equipmentId') equipmentId: string, @Req() req) {
        let jwtPayload: JWTPayloadDto = req.user;
        if (image) {
            let response = await this._equipmentService.addNewEquipmentImage(image, equipmentId, jwtPayload);
            return response;
        } else {
            throw ErrorHandler.throwCustomError("Debe enviar una imagen para proceder con la actualizacion.", HttpStatus.BAD_REQUEST);
        }
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Delete('deleteEquipmentImage/:equipmentId')
    async deleteCatalogueImage(@Body() deleteEquipmentImageDto: DeleteEquipmentImageDto, @Param('equipmentId') equipmentId: string, @Req() req) {
        let jwtPayload: JWTPayloadDto = req.user;
        let response = await this._equipmentService.deleteEquipmentImage(deleteEquipmentImageDto, equipmentId, jwtPayload);
        return response;
    }

}
