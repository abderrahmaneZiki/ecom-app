import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserDto from 'src/dto/user.dto';


import UserEntity from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {

    }

    async register(data: UserDto) {
        if (await this.userExist(data.username)) {
            throw new HttpException('username already exist', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.create(data);
        throw new HttpException('user created', HttpStatus.CREATED);
    }

    async login(data: UserDto) {
        const user = await this.userExist(data.username);
        if (user) {
            if (await user.comparePassword(data.password)) {
                return user.userResponse();
            }
            else {
                throw new HttpException('invalid passord', HttpStatus.BAD_REQUEST);
            }
        }
        throw new HttpException('invalid username', HttpStatus.BAD_REQUEST);
    }
    async userExist(username) {
        return await this.userRepository.findOne({ where: username });
    }
}
