import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from './local.entity';

@Injectable()
export class LocalService {
    constructor(
        @InjectRepository(Local)
        private readonly localRepository: Repository<Local>
    ) { }

    public async getAll(): Promise<Local[]> {
        console.log("getAll de locals")
        const result = await this.localRepository.find();
        console.log("resultado: " + result);
        let locales: Local[] = [];
        result.forEach(element => {
            locales.push(this.localRepository.create({...element}))
        });
        return locales;
    }
}
