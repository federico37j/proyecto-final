import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        console.log("getAll de locales")
        try {
            const result = await this.localRepository.find({
                relations: ["articulo"]
            });
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
}
