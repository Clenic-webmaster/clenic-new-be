import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { JWTPayloadDto, EquipmentDto } from 'src/models/dto';
import { Bussiness, Order } from 'src/models/interfaces';
import { ErrorHandler } from 'src/utils/errors';
import { EquipmentService } from '../equipment/equipment.service';

@Injectable()
export class BussinessService {
    constructor(@InjectModel('Bussiness') private readonly _bussinessModel: Model<Bussiness>, private readonly _equipmentService: EquipmentService) { }
    //BussinessService
    async getBussinessModelSession(): Promise<ClientSession> {
        const session = await this._bussinessModel.db.startSession()
        return session;
    }

    async getBussinessById(bussinessId: string) {
        const bussiness = await this._bussinessModel.findById(bussinessId).populate('equipments');
        return bussiness;
    }

    async getBussinessFullOrders(bussinessId: string): Promise<Order[]> {
        const bussiness: Bussiness = await this._bussinessModel.findById(bussinessId)
            .populate({
                path: 'clenics',
                populate: [
                    {
                        path: 'orders',
                        populate: [
                            { path: 'user' },
                            { path: 'engineer' },
                            { path: 'equipment' }
                        ]
                    },
                    { path: 'user' }
                ]
            }).catch((error) => { throw ErrorHandler.throwDefaultInternalServerError(error) })

        var orders: [Order]
        bussiness.clenics.forEach((element) => {
            orders.concat(element.orders);
        })

        return orders;
    }

    async createBussiness(bussinessDto, session?: ClientSession): Promise<Bussiness> {
        const bussiness = new this._bussinessModel(bussinessDto);
        return await bussiness.save({ session: session });
    }

    async createAndInsertClenicEquipment(newEquipmentDto: EquipmentDto, jwtPayload: JWTPayloadDto): Promise<any> {
        const bussiness = await this.getBussinessById(jwtPayload.bussinessId);
        if (bussiness.user == jwtPayload.userId) {
            const newEquipment = await this._equipmentService.createEquipment(newEquipmentDto)
                .catch((error) => {
                    throw ErrorHandler.throwDefaultInternalServerError(error);
                })
            bussiness.equipments.push(newEquipment._id as any);
            await bussiness.save();
            return {
                message: "El equipo médico ha sido creado con éxito"
            }
        } else {
            throw ErrorHandler.throwCustomError("No tiene permisos para agregar un nuevo equipo médico al negocio especificado", HttpStatus.BAD_REQUEST);
        }
    }

    async deleteEquipment(equipmentId: string, jwtPayload: JWTPayloadDto): Promise<any> {
        const bussiness = await this.getBussinessById(jwtPayload.bussinessId);
        if (bussiness.user == jwtPayload.userId) {
            const bussinessIndex = bussiness.equipments.indexOf(equipmentId as any);
            if (bussinessIndex > -1) {
                bussiness.equipments.splice(bussinessIndex, 1);
                await bussiness.save();
                await this._equipmentService.deleteEquipment(equipmentId);
                return {
                    message: "El equipo médico ha sido eliminado con éxito"
                }
            } else {
                throw ErrorHandler.throwCustomError("No se encontró el equipo médico en la Clenic", HttpStatus.BAD_REQUEST);
            }

        } else {
            throw ErrorHandler.throwCustomError("No tiene permisos para agregar un nuevo equipo médico al negocio especificado", HttpStatus.BAD_REQUEST);
        }
    }

    async getEquipmentListByBussinessId(bussinessId: string, jwtPayload: JWTPayloadDto) {
        const bussiness = await this.getBussinessById(jwtPayload.bussinessId);
        const equipments = [];
        if (bussiness.user == jwtPayload.userId) {
            bussiness.equipments.forEach((element) => {
                equipments.push(element);
            })
            return equipments;
        } else {
            throw ErrorHandler.throwCustomError("No tiene permisos para agregar un nuevo equipo médico al negocio especificado", HttpStatus.BAD_REQUEST);
        }
    }

    async addOrderToBussiness(bussinessId: string, orderId: string): Promise<Bussiness> {
        const bussiness = await this.getBussinessById(bussinessId);
        const index = bussiness.orders.indexOf(orderId as any);
        if (index < 0) {
            bussiness.orders.push(orderId as any);
            return await bussiness.save();
        } else {
            throw ErrorHandler.throwCustomError("Ya existe una order en la clenic con el id " + orderId, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteOrderFromBussiness(bussinessId: string, orderId: string): Promise<Bussiness> {
        const bussiness = await this.getBussinessById(bussinessId);
        const index = bussiness.orders.indexOf(orderId as any);
        if (index > -1) {
            bussiness.orders.splice(index, 1);
            return await bussiness.save();
        } else {
            throw ErrorHandler.throwCustomError("No existe la orden en la clenic", HttpStatus.BAD_REQUEST);
        }
    }
}
