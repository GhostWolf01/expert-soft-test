<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import User from './components/User.vue';
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import LoginModal from './components/LoginModal.vue';
import Message from './components/Message.vue';

import { useConnectionStore } from './stores/connection';
import { useMessageStore, type MessageDto, type MessageFileDto } from './stores/message';
import { useUserStore, type LoginUserDto } from './stores/user';

const connectionStore = useConnectionStore();
const messageStore = useMessageStore();
const userStore = useUserStore();

const text = ref<string>('');

const showLoginModal = ref<boolean>(false);

function clickShowLogin() {
  if (userStore.isLogin) {
    userStore.logout();
  } else {
    showLoginModal.value = true;
  }
}

function hiddenLoginModal() {
  showLoginModal.value = false;
}

function input(value: string) {
  text.value = value;
}

function pushMassage() {
  const message: MessageDto = {
    text: text.value,
    type: 'text',
    userId: userStore.user.id,
  };
  messageStore.messagePush(message);
}

function drop(event: DragEvent) {
  console.log('drop: ', event);
  if (event.dataTransfer) {
    const files = event.dataTransfer.files;
    const file = files[0];

    const message: MessageFileDto = {
      file,
      filename: file.name,
      type: 'file',
      userId: userStore.user.id,
    };

    messageStore.messageFilePush(message);
  }
}

function preventDefaults(event: Event) {
  event.preventDefault();
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});

function main() {
  connectionStore.bindEvents();
  messageStore.bindEvents();
  userStore.bindEvents();
  connectionStore.connect();
  messageStore.messageList();
}

main();
</script>

<template>
  <header class="header">
    <User :user="userStore.user" />
    <div class="header__btns">
      <Button :text="userStore.isLogin ? 'Logout' : 'Login'" @click="clickShowLogin" />
    </div>
  </header>
  <main class="main" @drop.prevent="drop">
    <div class="main__body">
      <Message
        v-for="message in messageStore.messages"
        :key="message.id"
        :message="message"
        :class="{ 'message--right': message.user.id === userStore.user.id }"
      ></Message>
    </div>
    <div class="main__footer">
      <Input
        class="main__footer-input"
        :value="text"
        placeholder="Enter text"
        @input="input"
        @keyup.enter="pushMassage"
      />
      <Button text="Push" @click="pushMassage" />
    </div>
  </main>
  <LoginModal :is-show="showLoginModal" @hidden-modal="hiddenLoginModal" />
</template>

<style lang="scss">
@import './assets//variables.scss';

#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: $background-app;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: $background-header;
}

.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: $background-app;
  position: relative;
  overflow: hidden;
  &__body {
    padding: 0 20px 20px 20px;
    margin-bottom: 80px;
    // height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    & > :nth-child(n) {
      margin-bottom: 6px;
    }
    & > :last-child {
      margin-bottom: 0;
    }
  }
  &__footer {
    padding: 20px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    &-input {
      width: 100%;
      margin-right: 10px;
    }
  }
}
</style>
