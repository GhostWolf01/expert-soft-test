import { Message } from 'src/db/schema/message';

export type MessageDto = Pick<Message, 'text' | 'type' | 'userId'>;

export type AllMessagesDto = {
  messages: Message[];
};

export type ReturnMessageDto = {
  message: Message;
};
