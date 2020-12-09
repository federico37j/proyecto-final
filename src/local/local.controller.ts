import { Controller, Get } from '@nestjs/common';
import { Local } from './local.entity';
import { LocalService } from './local.service';

@Controller('local')
export class LocalController {
    public constructor(private readonly localService: LocalService) { }

    @Get('get_all')
    public getAll(): Promise<Local[]>{
        return this.localService.getAll();
    }
}
