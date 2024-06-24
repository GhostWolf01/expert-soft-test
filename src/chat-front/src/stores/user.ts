import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { ref } from 'vue';
import type { User } from '@/types';
import { setTokenToCookies, getTokenFromCookies, removeTokenFromCookies } from '@/utils/cookies';

export type LoginUserDto = {
  name: string;
  password: string;
};

type ReturnLoginUserDto = {
  user: Pick<User, 'id' | 'name'>;
  jwt: string;
  expires: string;
};

export type ReturnError = {
  success: boolean;
  error: Error;
};

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    id: 0,
    name: '',
  });

  const isLogin = ref<boolean>(false);

  function bindEvents() {
    socket.on('connect', () => {
      const token = getTokenFromCookies();
      if (token) {
        socket.emit('login:token', { token }, (data: ReturnLoginUserDto) => {
          user.value = data.user;
          setTokenToCookies('jwtToken', data.jwt, {
            expires: new Date(data.expires),
          });
          isLogin.value = true;
        });
      }
    });
  }

  function signin(userL: LoginUserDto): ReturnError {
    try {
      socket.emit('signin', { ...userL }, (data: ReturnLoginUserDto) => {
        user.value = data.user;
        setTokenToCookies('jwtToken', data.jwt, {
          expires: new Date(data.expires),
        });
        isLogin.value = true;
      });
      return {
        success: true,
        error: new Error(''),
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        error,
      };
    }
  }

  function login(userL: LoginUserDto): ReturnError {
    try {
      socket.emit('login', { ...userL }, (data: ReturnLoginUserDto) => {
        user.value = data.user;
        setTokenToCookies('jwtToken', data.jwt, {
          expires: new Date(data.expires),
        });
        isLogin.value = true;
      });
      return {
        success: true,
        error: new Error(''),
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        error,
      };
    }
  }

  function logout() {
    removeTokenFromCookies();
    user.value = {
      id: 0,
      name: '',
    };
    isLogin.value = false;
  }

  return { user, isLogin, signin, login, logout, bindEvents };
});
