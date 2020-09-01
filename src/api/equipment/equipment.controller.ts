import { Controller, Get, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('equipment')
export class EquipmentController {
    constructor(private readonly _equipmentService: EquipmentService) { }

    @Get('/list')
    async getEquipments() {
        const equipment = this._equipmentService.getEquipments();
        return equipment;
    }
}
