import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';

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
    const payload = {
      sub: user.userId,
      email: user.email,
    };

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: await this.jwtService.signAsync(payload),
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

    const payload = {
      sub: user.userId,
      email: user.email,
    };

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
