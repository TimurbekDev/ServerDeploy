import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto)
  }

  @Get('google')
  async googleAuth(){}

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleAuthCallback(@Req() request:any){
    return this.authService.googleAuth(request)
  }

  @Post('register')
  async register(@Body() registerDto:RegisterDto){
    return await this.authService.register(registerDto)
  }
}