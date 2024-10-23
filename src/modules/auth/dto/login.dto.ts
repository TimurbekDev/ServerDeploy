import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserRequest } from 'src/modules/user/interfaces/create-user.interface';

export class LoginDto implements ICreateUserRequest {
    @ApiProperty({
        description: 'username'
    })
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @ApiProperty({
        description:'password'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
