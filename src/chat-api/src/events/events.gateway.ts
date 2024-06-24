import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Server, Socket } from 'socket.io';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Message } from './entities/message.entity';
import { CreateUserDto, LoginUserDto, ReturnLoginUserDto, LoginUserTokenDto } from './dto/user';
import {
  CreateMessageDto,
  AllMessagesDto,
  ReturnMessageDto,
  CreateMessageFileDto,
} from './dto/message';
import * as argon2 from 'argon2';
// import { configuration } from 'src/config/configuration';
import * as fs from 'node:fs/promises';
import path from 'node:path';

@WebSocketGateway({
  cookie: true,
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('signin')
  async signin(@MessageBody() data: CreateUserDto): Promise<ReturnLoginUserDto> {
    const exitUsers = await this.usersRepository.findOne({
      select: {
        id: true,
        name: true,
      },
      where: {
        name: data.name,
      },
    });

    if (exitUsers) throw new BadRequestException('This user already exist!');

    const user = await this.usersRepository.save({
      name: data.name,
      password: await argon2.hash(data.password),
    });

    const date = new Date();
    date.setDate(30);
    const expires = date.toISOString();

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      jwt: String(user.id),
      expires,
    };
  }

  @SubscribeMessage('login:token')
  async loginToken(@MessageBody() data: LoginUserTokenDto): Promise<ReturnLoginUserDto> {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: Number(data.token),
      },
    });

    if (!user) throw new NotFoundException('This user not found!');

    const date = new Date();
    date.setDate(30);
    const expires = date.toISOString();

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      jwt: String(user.id),
      expires,
    };
  }

  @SubscribeMessage('login')
  async login(@MessageBody() data: LoginUserDto): Promise<ReturnLoginUserDto> {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        name: true,
        password: true,
      },
      where: {
        name: data.name,
      },
    });

    const passwordIsMatch = await argon2.verify(user.password, data.password);
    if (!user && !passwordIsMatch)
      throw new UnauthorizedException('User of password are incorrect!');

    const date = new Date();
    date.setDate(30);
    const expires = date.toISOString();

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      jwt: String(user.id),
      expires,
    };
  }

  @SubscribeMessage('message:list')
  async messages(): Promise<AllMessagesDto> {
    const messages = await this.messagesRepository.find({
      select: {
        user: {
          id: true,
          name: true,
        },
      },
      relations: {
        user: true,
      },
    });
    return {
      messages,
    };
  }

  @SubscribeMessage('message:push')
  async message(@MessageBody() data: CreateMessageDto): Promise<ReturnMessageDto> {
    const message = await this.messagesRepository.save({
      user: {
        id: data.userId,
      },
      text: data.text,
      type: data.type,
      url: '',
    });

    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: data.userId,
      },
    });

    return {
      message: {
        ...message,
        user,
      },
    };
  }

  @SubscribeMessage('message:filepush')
  async messageFile(
    @MessageBody() data: CreateMessageFileDto,
    @ConnectedSocket() client: Socket,
  ): Promise<ReturnMessageDto> {
    await fs.appendFile(path.join(process.cwd(), `/src/upload/${data.filename}`), data.file);
    const message = await this.messagesRepository.save({
      user: {
        id: data.userId,
      },
      text: data.filename,
      type: data.type,
      url: `/upload/${data.filename}`,
    });

    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: data.userId,
      },
    });

    return {
      message: {
        ...message,
        user,
      },
    };
  }
}
