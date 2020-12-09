<<<<<<< HEAD
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
=======
import { Injectable } from '@nestjs/common';
>>>>>>> origin/master
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
<<<<<<< HEAD
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
=======
        console.log("getAll de locals")
        const result = await this.localRepository.find();
        console.log("resultado: " + result);
        let locales: Local[] = [];
        result.forEach(element => {
            locales.push(this.localRepository.create({...element}))
        });
        return locales;
>>>>>>> origin/master
    }
}
