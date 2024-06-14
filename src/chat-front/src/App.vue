<script setup lang="ts">
import { ref } from 'vue';
import User from './components/User.vue';
import Button from './components/Button.vue';
import Input from './components/Input.vue';

import { useConnectionStore } from './stores/connection';
import { useMessageStore } from './stores/message';
import { useUserStore } from './stores/user';

const connectionStore = useConnectionStore();
connectionStore.bindEvents();

const messageStore = useMessageStore();
messageStore.bindEvents();

const userStore = useUserStore();
userStore.bindEvents();

connectionStore.connect();

const text = ref<string>('');

function input(value: string) {
  text.value = value;
}

function pushMassage() {}
</script>

<template>
  <header class="header">
    <User :user="userStore.user" />
    <div class="header__btns">
      <Button :text="userStore.isLogin ? 'Logout' : 'Login'" />
    </div>
  </header>
  <main class="main">
    <div class="main__body"></div>
    <div class="main__footer">
      <Input class="main__footer-input" :value="text" placeholder="Enter text" @input="input" />
      <Button text="Push" @click="pushMassage" />
    </div>
  </main>
</template>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  &__body {
    padding: 20px;
    height: 100%;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    &-input {
      width: 100%;
      margin-right: 10px;
    }
  }
}
</style>
