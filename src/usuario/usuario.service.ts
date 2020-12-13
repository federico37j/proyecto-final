import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioDTO } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) { }

    public async addCliente(newUsuario: UsuarioDTO): Promise<Usuario> {
        console.log("post de registrar usuario")
        try {
            const usuarioCreado: Usuario = await this.usuarioRepository.save(new Usuario(
                newUsuario.email,
                newUsuario.password,
                newUsuario.direccion,
                newUsuario.ciudad,
                newUsuario.esAdmin
            )
            );
            if (usuarioCreado.getID()){
                console.log("se ha creado correctamente ",usuarioCreado.getMail());
                return usuarioCreado;
            }
            else {
                throw new HttpException('No se pudo crear el usuario ', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async getUsuarioByEmail(mail: string): Promise<Usuario> {
        console.log("Getting Usuario por email: " + mail);
        let usuario: Usuario;
        let usuario_creation_response: Usuario;
        try {
            usuario = await this.usuarioRepository.findOne(
                { where:
                    {email: mail} 
                }
            );
            usuario_creation_response = this.usuarioRepository.create({ ...usuario });

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
        return usuario_creation_response;
    }

    public async loginUser(userInfo: UsuarioDTO): Promise<Usuario> {
        console.log("login....");
        console.log("mail info: ", userInfo.email);
        try {
            let introUsuario = this.getUsuarioByEmail(userInfo.email);
            let introPassword = (await introUsuario).getContraseña()
            if (introUsuario) {
                if (userInfo.password == introPassword) {
                    return introUsuario;
                }
                else{
                    throw new HttpException('Acceso denegado ', HttpStatus.UNAUTHORIZED);
                }
            }
            else{
                throw new HttpException('Ya existe un usuario con ese mail ', HttpStatus.FORBIDDEN);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
}
