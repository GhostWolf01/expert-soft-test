import { Module } from '@nestjs/common';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { EventsModule } from './events/events.module';
import schema from './db/schema';
@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DB',
      postgres: {
        url: process.env.DB_URL,
      },
      config: { schema },
    }),
    EventsModule,
  ],
})
export class AppModule {}
