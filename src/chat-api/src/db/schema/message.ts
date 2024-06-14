import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';
import { relations } from 'drizzle-orm';

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  text: text('text'),
  type: text('type', { enum: ['text', 'file'] }),
  url: text('url'),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

export type Message = typeof messages.$inferSelect; // return type when queried
export type NewMessage = typeof messages.$inferInsert; // insert type

export const messagesRelations = relations(messages, ({ one }) => ({
  author: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}));
