import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorators';
import { security } from 'src/utils/constants/security';
import { JWTPayloadDto, EquipmentDto, OrderDto, AssignEngineerDto, UpdateOrderDto } from 'src/models/dto';
import { OrderService } from '../order/order.service';
import { ErrorHandler } from 'src/utils/errors';
import { EquipmentService } from '../equipment/equipment.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bussiness')
export class BussinessController {
    //Business Controller
    constructor(
        private readonly _bussinessService: BussinessService,
        private readonly _orderService: OrderService,
        private readonly _equipmentService: EquipmentService
    ) { }

    @Roles(security.roles.ROLE_CLENIC)
    @Post('createEquipment')
    async createEquipment(@Body() newEquipmentDto: EquipmentDto, @Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        return await this._bussinessService.createAndInsertClenicEquipment(newEquipmentDto, jwtPayload);
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Delete('deleteEquipment/:id')
    async deleteEquipment(@Param('id') id, @Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        return await this._bussinessService.deleteEquipment(id, jwtPayload);
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Get('equipment/list')
    async equipmentList(@Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        return await this._bussinessService.getEquipmentListByBussinessId(jwtPayload.bussinessId, jwtPayload);
    }

    @Roles(security.roles.ROLE_ADMIN)
    @Get('engineer/list')
    async engineerList(@Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        return await this._bussinessService.getEngineerListByBussinessId(jwtPayload.bussinessId, jwtPayload);
    }

    @Roles(security.roles.ROLE_ADMIN)
    @Get('admin/order/list')
    async adminOrderList(@Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        return await this._bussinessService.getFullAdminOrderList(jwtPayload.bussinessId, jwtPayload);
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Get('clenic/order/list')
    async clenicOrderList(@Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        return await this._bussinessService.getFullClenicOrderList(jwtPayload.bussinessId, jwtPayload);
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Post('createOrder')
    async createOrder(@Body() newOrder: OrderDto, @Req() req) {
        const jwtPayload: JWTPayloadDto = req.user;
        const toBussiness = await (await this._bussinessService.getBussinessById(jwtPayload.bussinessId)).depopulate('equipments');
        const indexOfEquipment = toBussiness.equipments.indexOf(newOrder.equipment as any);
        if (indexOfEquipment > -1) {
            const order = await this._orderService.createOrder(newOrder, jwtPayload.bussinessId);
            if (order) {
                const bussiness = await this._bussinessService.addOrderToBussiness(jwtPayload.bussinessId, order._id)
                    .catch((error) => {
                        throw ErrorHandler.throwDefaultInternalServerError(error);
                    });
                const equipment = await this._equipmentService.addOrderToEquipment(newOrder.equipment, order._id)
                    .catch((error) => {
                        throw ErrorHandler.throwDefaultInternalServerError(error);
                    });
                if (bussiness && equipment) {
                    return {
                        message: "La orden ha sido creada con éxito",
                        order
                    }
                } else {
                    throw ErrorHandler.throwDefaultInternalServerError();
                }
            } else {
                throw ErrorHandler.throwDefaultInternalServerError();
            }
        } else {
            throw ErrorHandler.throwCustomError('El equipo médico especificado no existe en la clenic', HttpStatus.BAD_REQUEST);
        }
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Post('assignEngineerInOrder/:orderId')
    async assignEngineerInOrder(@Body() assignEngineer: AssignEngineerDto, @Param('orderId') orderId: string) {
        const order = await this._orderService.assignEngineer(assignEngineer, orderId);
        if (order) {
            return {
                message: "El ingeniero ha sido asignado a la orden correctamente"
            }
        } else {
            throw ErrorHandler.throwDefaultInternalServerError();
        }
    }

    @Roles(security.roles.ROLE_CLENIC)
    @Post('updateOrder/:orderId')
    async updateOrder(@Body() updateOrder: UpdateOrderDto, @Param('orderId') orderId: string) {
        const order = await this._orderService.updateOrder(updateOrder, orderId);
        if (order) {
            return {
                message: "La orden ha sido actualizada correctamente"
            }
        } else {
            throw ErrorHandler.throwDefaultInternalServerError();
        }
    }
}
