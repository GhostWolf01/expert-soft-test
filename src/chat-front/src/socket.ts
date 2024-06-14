import { io } from 'socket.io-client';
import { getTokenFromCookies } from '@/utils/cookies';

const URL = 'ws://localhost:3000';

export const socket = io(URL, {
  auth: {
    token: getTokenFromCookies(),
  },
});
