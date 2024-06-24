import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Message } from './entities/message.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [EventsGateway],
})
export class EventsModule {}
