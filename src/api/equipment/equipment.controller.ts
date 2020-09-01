import { Controller, Get } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
    constructor(private readonly _equipmentService: EquipmentService) { }

    @Get('/list')
    async getEquipments() {
        const equipment = this._equipmentService.getEquipments();
        return equipment;
    }
}
