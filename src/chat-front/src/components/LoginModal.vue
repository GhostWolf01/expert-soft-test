<script setup lang="ts">
import { ref } from 'vue';
import MainModal from './MainModal.vue';
import Input from './Input.vue';
import Button from './Button.vue';

import { useUserStore, type LoginUserDto, type ReturnError } from '@/stores/user';

type Props = {
  isShow: boolean;
};

const props = defineProps<Props>();

type Emits = {
  (e: 'hiddenModal'): void;
};

const emit = defineEmits<Emits>();

const userStore = useUserStore();

function closeModal() {
  emit('hiddenModal');
}

const user = ref<LoginUserDto>({
  name: '',
  password: '',
});

const responseError = ref<ReturnError>({
  success: true,
  error: new Error(''),
});

function checkError(response: ReturnError) {
  responseError.value = response;
  return response.success;
}

function login() {
  const response = userStore.login({ ...user.value });
  if (checkError(response)) closeModal();
}

function signin() {
  const response = userStore.signin({ ...user.value });
  if (checkError(response)) closeModal();
}
</script>

<template>
  <MainModal :isShow="props.isShow" @hidden-modal="closeModal">
    <div class="login-modal">
      <Input
        class="login-modal__input"
        placeholder="Name"
        :value="user.name"
        @input="(value) => (user.name = value)"
      />
      <Input
        class="login-modal__input"
        placeholder="Password"
        :value="user.password"
        @input="(value) => (user.password = value)"
      />
      <p class="login-modal__error" v-show="!responseError.success">
        {{ responseError.error.message }}
      </p>
      <div class="login-modal__btns">
        <Button class="login-modal__button" @click="login">Login</Button>
        <Button class="login-modal__button" @click="signin">Sign In</Button>
      </div>
    </div>
  </MainModal>
</template>

<style lang="scss">
.login-modal {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__input {
    width: 100%;
    margin-bottom: 10px;
  }
  &__button {
  }
  &__btns {
    display: flex;
    justify-content: center;
    & > :nth-child(n) {
      margin-right: 4px;
    }
    & > :last-child {
      margin-right: 0;
    }
  }
  &__error {
    color: red;
    font-size: 16px;
  }
}
</style>
