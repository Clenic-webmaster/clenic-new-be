import { Controller, Get } from '@nestjs/common';
import { BussinessService } from './bussiness.service';

@Controller('bussiness')
export class BussinessController {
    constructor(private readonly _bussinessService: BussinessService) { }

    @Get('/list')
    async getBussiness() {
        const bussiness = await this._bussinessService.getBussiness();
        return bussiness;
    }
}
