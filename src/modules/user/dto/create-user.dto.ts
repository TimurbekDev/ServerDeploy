import { ApiProperty } from "@nestjs/swagger";
import { ICreateUserRequest } from "../interfaces/create-user.interface";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto implements ICreateUserRequest{
    @ApiProperty({
        description:'username'
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description:'password'
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
