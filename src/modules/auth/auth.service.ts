import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ICreateUserRequest } from '../user/interfaces/create-user.interface';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '@prisma';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(PrismaService) private prisma: PrismaService
  ) {}

  async register(payload: ICreateUserRequest) {    
    const user = await this.userService.create(payload);
    return user;
  }

  async login(payload: ICreateUserRequest) {
    const user = await this.userService.findByUsername(payload.username);

    if (!user) {
      throw new BadRequestException('Password or Email incorrect');
    }
    
    const isValid = await compare(payload.password, user.password);
    
    if (!isValid) {
      throw new BadRequestException('Password or Email incorrect');
    }
    return user;
  }

  async googleAuth(req:any){
    console.log(req.user.emails[0].value);
    await this.prisma.user.create({
      data : {
        username:req.user.emails[0].value,
        password:req.user.displayName
      }
    })
    
    return 'auth success'
  }
}
