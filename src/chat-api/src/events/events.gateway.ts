import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import schema from 'src/db/schema';

import type { LoginUserDto, ReturnLoginUserDto, LoginUserTokenDto } from './dto/user';
import type { MessageDto, AllMessagesDto, ReturnMessageDto } from './dto/message';

@WebSocketGateway({
  cookie: true,
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(@Inject('DB') private readonly drizzleDB: PostgresJsDatabase<typeof schema>) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('signin')
  async signin(@MessageBody() data: LoginUserDto): Promise<ReturnLoginUserDto> {
    const exitUsers = await this.drizzleDB.query.users.findFirst({
      with: {
        name: data.name,
      },
    });

    if (exitUsers) throw new BadRequestException('This user already exist!');

    const users = await this.drizzleDB.insert(schema.users).values(data).returning();
    const user = users[0];

    const date = new Date();
    date.setDate(30);
    const expires = date.toISOString();

    return {
      user,
      jwt: String(user.id),
      expires,
    };
  }

  @SubscribeMessage('login:token')
  async loginToken(@MessageBody() data: LoginUserTokenDto): Promise<ReturnLoginUserDto> {
    const users = await this.drizzleDB.query.users.findFirst({
      with: {
        id: data.token,
      },
    });

    if (!users[0]) throw new NotFoundException('This user not found!');

    const user = users[0];

    const date = new Date();
    date.setDate(30);
    const expires = date.toISOString();

    return {
      user,
      jwt: String(user.id),
      expires,
    };
  }

  @SubscribeMessage('login')
  async login(@MessageBody() data: LoginUserDto): Promise<ReturnLoginUserDto> {
    const users = await this.drizzleDB.query.users.findFirst({
      with: {
        name: data.name,
      },
    });
    if (!users[0]) throw new NotFoundException('This user not found!');

    const user = users[0];

    const date = new Date();
    date.setDate(30);
    const expires = date.toISOString();

    return {
      user,
      jwt: String(user.id),
      expires,
    };
  }

  @SubscribeMessage('message:list')
  async messages(): Promise<AllMessagesDto> {
    const messages = await this.drizzleDB.select().from(schema.messages);
    return {
      messages,
    };
  }

  @SubscribeMessage('message:push')
  async message(@MessageBody() data: MessageDto): Promise<ReturnMessageDto> {
    const messages = await this.drizzleDB.insert(schema.messages).values(data).returning();
    return {
      // event: 'message:get',
      // data: {},
      message: messages[0],
    };
  }
}
