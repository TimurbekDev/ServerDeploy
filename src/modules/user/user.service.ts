import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ICreateUserRequest } from './interfaces/create-user.interface';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '@prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: ICreateUserRequest) {
    const existingUser = await this.prisma.user.findFirst({
      where: { username: payload.username },
    });

    if (existingUser) {
      throw new BadRequestException('Username already in use');
    }

    const hashedPassword = await hash(payload.password, 12);
    const newUser = await this.prisma.user.create({
      data: {
        username: payload.username,
        password: hashedPassword,
      },
    });    

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findFirst({
      where: { username: String(username) },
    });

    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async remove(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: `User #${id} has been removed successfully` }; // Adjusted return message
  }
}
