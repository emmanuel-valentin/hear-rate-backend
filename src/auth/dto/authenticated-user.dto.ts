import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticatedUserDto {
  // Validation
  @IsString()
  @MinLength(1)
  // Swagger
  @ApiProperty({ example: 'John', description: 'Nombre(s) del usuario' })
  firstName: string;

  // Validation
  @IsString()
  @MinLength(1)
  // Swagger
  @ApiProperty({ example: 'Doe', description: 'Apellido(s) del usuario' })
  lastName: string;

  // Validation
  @IsString()
  @IsEmail()
  // Swagger
  @ApiProperty({
    example: 'john@doe.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  // Swagger
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...',
    description: 'Token de autenticación del usuario',
  })
  token: string;
}
