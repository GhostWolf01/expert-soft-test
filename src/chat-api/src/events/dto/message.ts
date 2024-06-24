import { Message } from '../entities/message.entity';

import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  type: 'text';
  @IsNotEmpty()
  userId: number;
}

export class CreateMessageFileDto {
  @IsNotEmpty()
  file: Buffer;
  @IsNotEmpty()
  filename: string;
  @IsNotEmpty()
  type: 'file';
  @IsNotEmpty()
  userId: number;
}

export type AllMessagesDto = {
  messages: Message[];
};

export type ReturnMessageDto = {
  message: Message;
};
