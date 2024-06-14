import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { ref } from 'vue';
import type { User } from '@/types';
import { setTokenToCookies, getTokenFromCookies, removeTokenFromCookies } from '@/utils/cookies';

type LoginUserDto = {
  name: string;
  password: string;
};

type ReturnLoginUserDto = {
  user: Pick<User, 'id' | 'name'>;
  jwt: string;
  expires: string;
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

  function signin(userL: LoginUserDto) {
    socket.emit('signin', { ...userL }, (data: ReturnLoginUserDto) => {
      user.value = data.user;
      setTokenToCookies('jwtToken', data.jwt, {
        expires: new Date(data.expires),
      });
      isLogin.value = true;
    });
  }

  function login(userL: LoginUserDto) {
    socket.emit('login', { ...userL }, (data: ReturnLoginUserDto) => {
      user.value = data.user;
      setTokenToCookies('jwtToken', data.jwt, {
        expires: new Date(data.expires),
      });
      isLogin.value = true;
    });
  }

  return { user, isLogin, signin, login, bindEvents };
});
