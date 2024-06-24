import { io } from 'socket.io-client';
import { getTokenFromCookies } from '@/utils/cookies';
import { config } from './config/config';

const URL = config.apiUrl('ws');

export const socket = io(URL, {
  auth: {
    token: getTokenFromCookies(),
  },
});
