import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedUserDto, CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<AuthenticatedUserDto> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Este correo ya está asociado a una cuenta',
      );
    }
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    delete user.password;

    return {
      ...user,
      token: await this.jwtService.signAsync(user),
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthenticatedUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const isMatch = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    delete user.password;

    return {
      ...user,
      token: await this.jwtService.signAsync(user),
    };
  }

  async checkStatus(userId: number, email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { userId, email },
    });

    delete user.password;

    return {
      ...user,
      token: await this.jwtService.signAsync(user),
    };
  }
}
