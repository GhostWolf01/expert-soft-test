import { defineStore } from 'pinia';
import { socket } from '@/socket';
import { ref } from 'vue';

export const useConnectionStore = defineStore('connection', () => {
  const isConnected = ref<boolean>(false);

  function bindEvents() {
    socket.on('connect', () => {
      isConnected.value = true;
    });

    socket.on('disconnect', () => {
      isConnected.value = false;
    });
  }

  function connect() {
    socket.connect();
  }

  return { isConnected, bindEvents, connect };
});
