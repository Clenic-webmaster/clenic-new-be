import { Controller, Get, UseGuards } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bussiness')
export class BussinessController {
    constructor(private readonly _bussinessService: BussinessService) { }
}
