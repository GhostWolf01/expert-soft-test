import { User } from 'src/db/schema/user';

export type LoginUserDto = {
  name: string;
  password: string;
};

export type LoginUserTokenDto = {
  token: string;
};

export type ReturnLoginUserDto = {
  user: Pick<User, 'id' | 'name'>;
  jwt: string;
  expires: string;
};
