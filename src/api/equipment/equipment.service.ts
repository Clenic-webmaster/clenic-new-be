import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import { Model, ClientSession } from 'mongoose';
import { DeleteEquipmentImageDto, EquipmentDto, JWTPayloadDto } from 'src/models/dto';
import { Equipment } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';
import * as dot from 'dot-object';
import { storage } from 'src/utils/constants/storage';
import { TreatmentImagesService } from 'src/treatment-images/treatment-images.service';

@Injectable()
export class EquipmentService {
    constructor(
        @InjectModel('Equipment') private readonly _equipmentModel: Model<Equipment>,
        private readonly _treatmentImagesService: TreatmentImagesService
    ) { }

    async getEquipmentModelSession(): Promise<ClientSession> {
        const session = await this._equipmentModel.db.startSession()
        return session;
    }

    async getEquipments() {
        const equipments = await this._equipmentModel.find();
        return equipments;
    }

    async getEquipmentById(equipmentId: string) {
        const equipment = await this._equipmentModel.findById(equipmentId);
        return equipment;
    }

    async createEquipment(newEquipment: EquipmentDto) {
        try {
            newEquipment.manufacturing = moment(newEquipment.manufacturing).format("YYYY-MM-DD HH:mm:ss");
        } catch (error) {
            throw ErrorHandler.throwDefaultInternalServerError(error);
        }
        const equipment = new this._equipmentModel(newEquipment);
        return await equipment.save();
    }

    async deleteEquipment(equipmentId: string) {
        return await this._equipmentModel.deleteOne({ _id: equipmentId });
    }

    async updateEquipment(equipmentId: string, equipmentDto: EquipmentDto) {

        //Update only comming fields
        let dotBasicInformation = dot.dot(equipmentDto);

        const equipment = await this._equipmentModel.findByIdAndUpdate(equipmentId, dotBasicInformation)
            .catch((error) => {
                throw ErrorHandler.throwDefaultInternalServerError(error);
            });
        return equipment;
    }

    async addNewEquipmentImage(image, equipmentId: string, jwtPayload: JWTPayloadDto): Promise<any> {
        let bussiness = await this.getEquipmentById(equipmentId)
            .catch((error) => {
                throw ErrorHandler.throwDefaultInternalServerError(error);
            })
        if (!bussiness) {
            throw ErrorHandler.throwCustomError("No se encontro negocio", HttpStatus.BAD_REQUEST);
        }

        const index = bussiness.images.indexOf(`${storage.STORAGE_USER_URL}/${jwtPayload.userId}/${storage.STORAGE_BUSSINESS_EQUIPMENT_URL}/${equipmentId}/${image.originalname}`);
        if (index < 0) {
            let imageStored = await this._treatmentImagesService.uploadImage(image, `${storage.STORAGE_USER_URL}/${jwtPayload.userId}/${storage.STORAGE_BUSSINESS_EQUIPMENT_URL}/${equipmentId}/${image.originalname}`)
                .catch((error) => {
                    throw ErrorHandler.throwDefaultInternalServerError(error);
                })
            bussiness.images.push(`${storage.STORAGE_USER_URL}/${jwtPayload.userId}/${storage.STORAGE_BUSSINESS_EQUIPMENT_URL}/${equipmentId}/${image.originalname}`);
            await bussiness.save();
            return {
                message: "La imagen ha sido ingresada correctamente a su equipo médico",
                urlImage: imageStored.Location
            };
        } else {
            throw ErrorHandler.throwCustomError("Ya existe una imagen en el equipo médico con el nombre " + image.originalname, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteEquipmentImage(deleteEquipmentImageDto: DeleteEquipmentImageDto, equipmentId: string, jwtPayload: JWTPayloadDto): Promise<any> {
        let bussiness = await this.getEquipmentById(equipmentId)
            .catch((error) => {
                throw ErrorHandler.throwDefaultInternalServerError(error);
            })
        if (!bussiness) {
            throw ErrorHandler.throwCustomError("No se encontro negocio", HttpStatus.BAD_REQUEST);
        }
        const index = bussiness.images.indexOf(deleteEquipmentImageDto.url);
        if (index > -1) {
            bussiness.images.splice(index, 1);
            await bussiness.save();
            let imageStored = await this._treatmentImagesService.deleteImage(deleteEquipmentImageDto.url)
                .catch((error) => {
                    throw ErrorHandler.throwDefaultInternalServerError(error);
                })
            return {
                message: "La imagen ha sido eliminada correctamente de su equipo médico"
            };
        } else {
            throw ErrorHandler.throwCustomError("No se encontro la imagen en el equipo médico", HttpStatus.BAD_REQUEST);
        }
    }

    async addOrderToEquipment(equipmentId: string, orderId: string): Promise<Equipment> {
        const equipment = await this.getEquipmentById(equipmentId);
        const index = equipment.orders.indexOf(orderId as any);
        if (index < 0) {
            equipment.orders.push(orderId as any);
            return await equipment.save();
        } else {
            throw ErrorHandler.throwCustomError("Ya existe una orden en el equipo médico con el id " + orderId, HttpStatus.BAD_REQUEST);
        }
    }
}
