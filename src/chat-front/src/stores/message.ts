import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { ref } from 'vue';
import type { Message } from '@/types';

type AllMessagesDto = {
  messages: Message[];
};

type MessageDto = Pick<Message, 'text' | 'type' | 'userId'>;

type ReturnMessageDto = {
  message: Message;
};

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([]);

  function bindEvents() {
    socket.on('connect', () => {});

    socket.on('message:push', (data: ReturnMessageDto) => {
      messages.value.push(data.message);
    });
  }

  function messagePush(message: MessageDto) {
    socket.emit('message:push', { ...message }, (data: ReturnMessageDto) => {
      messages.value.push(data.message);
    });
  }

  return { messages, bindEvents, messagePush };
});
