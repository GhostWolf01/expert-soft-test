import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @MinLength(6, { message: 'Password must be more then 6 symbols' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export type ReturnLoginUserDto = {
  user: Pick<User, 'id' | 'name'>;
  jwt: string;
  expires: string;
};
