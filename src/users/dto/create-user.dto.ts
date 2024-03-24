import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  username: string;
  @IsString()
  password: string;

  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
}
