import { Body, Controller, Post } from '@nestjs/common';
import UserDto from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/register')
    register(@Body() data: UserDto) {
        return this.userService.register(data);
    }
    @Post('/login')
    login(@Body() data: UserDto) {
        return this.userService.login(data);
    }
}
