import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { ref } from 'vue';
import type { Message, User } from '@/types';
import { intlFormat } from '@/utils/intl';
import { config } from '@/config/config';

type AllMessagesDto = {
  messages: Message[];
};

export type MessageDto = {
  userId: number;
  type: 'text';
  text: string;
};

export type MessageFileDto = {
  userId: number;
  type: 'file';
  file: File;
  filename: string;
};

type ReturnMessageDto = {
  message: Message;
};

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([]);

  function bindEvents() {
    socket.on('connect', () => {
      messageList();
    });

    socket.on('message:push', (data: ReturnMessageDto) => {
      messages.value.push(data.message);
    });

    socket.on('message:filepush', (data: ReturnMessageDto) => {
      messages.value.push({
        ...data.message,
        url: config.apiUrl('http') + data.message.url,
      });
    });
  }

  function messageList() {
    // messages.value.push(
    //   {
    //     id: 0,
    //     text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius assumenda eos accusamus maiores eveniet nobis molestiae. Minus cum libero quos blanditiis dolor eius odit qui, distinctio sequi est harum quod!',
    //     type: 'text',
    //     url: '',
    //     userId: 0,
    //     author: {
    //       id: 1,
    //       name: 'a test',
    //     },
    //     createdAt: intlFormat(new Date()),
    //     updatedAt: intlFormat(new Date()),
    //   },
    //   {
    //     id: 1,
    //     text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius assumenda eos accusamus maiores eveniet nobis molestiae. Minus cum libero quos blanditiis dolor eius odit qui, distinctio sequi est harum quod!',
    //     type: 'text',
    //     url: '',
    //     userId: 0,
    //     author: {
    //       id: 0,
    //       name: 'a test',
    //     },
    //     createdAt: intlFormat(new Date()),
    //     updatedAt: intlFormat(new Date()),
    //   },
    // );

    socket.emit('message:list', '', (data: AllMessagesDto) => {
      data.messages.forEach((message) => {
        message.createdAt = intlFormat(new Date(message.createdAt));
        message.updatedAt = intlFormat(new Date(message.updatedAt));
        message.url = config.apiUrl('http') + message.url;
      });
      messages.value = data.messages;
    });
  }

  function messagePush(message: MessageDto) {
    socket.emit('message:push', { ...message }, (data: ReturnMessageDto) => {
      messages.value.push({
        ...data.message,
        createdAt: intlFormat(new Date(data.message.createdAt)),
        updatedAt: intlFormat(new Date(data.message.updatedAt)),
        url: config.apiUrl('http') + data.message.url,
      });
    });
  }

  function messageFilePush(message: MessageFileDto) {
    socket.emit('message:filepush', { ...message }, (data: ReturnMessageDto) => {
      messages.value.push({
        ...data.message,
        createdAt: intlFormat(new Date(data.message.createdAt)),
        updatedAt: intlFormat(new Date(data.message.updatedAt)),
        url: config.apiUrl('http') + data.message.url,
      });
    });
  }

  return { messages, bindEvents, messagePush, messageFilePush, messageList };
});
