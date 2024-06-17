import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  // Validation
  @IsString()
  @IsEmail()
  // Swagger
  @ApiProperty({
    example: 'john@doe.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  // Validation
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  // Swagger
  @ApiProperty({
    example: 'superSecretPassword123',
    description: 'Contraseña del usuario',
  })
  password: string;
}
