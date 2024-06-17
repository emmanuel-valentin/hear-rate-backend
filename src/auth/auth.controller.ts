import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthenticatedUserDto, CreateUserDto, LoginUserDto } from './dto';
import { User } from './decorators';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiOkResponse({
    description: 'Usuario registrado exitosamente',
    type: AuthenticatedUserDto,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autentica un usuario ya existente' })
  @ApiOkResponse({
    description: 'Usuario autenticado exitosamente',
    type: AuthenticatedUserDto,
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Verifica si un token es válido' })
  @ApiOkResponse({
    description: 'Token válido',
    type: AuthenticatedUserDto,
  })
  checkStatus(@User('userId') userId: number, @User('email') email: string) {
    return this.authService.checkStatus(userId, email);
  }
}
