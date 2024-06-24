<script setup lang="ts">
import type { Message } from '@/types';

type Props = {
  message: Message;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="message">
    <p class="message__user">{{ props.message.user.name }}</p>
    <p v-if="props.message.type == 'text'" class="message__text">{{ props.message.text }}</p>
    <a
      v-else-if="props.message.type == 'file'"
      class="message__text"
      :href="props.message.url"
      :download="props.message.text"
    >
      {{ props.message.text }}
    </a>
    <p class="message__date">
      {{ props.message.createdAt }}
    </p>
  </div>
</template>

<style lang="scss">
.message {
  background-color: #000;
  color: #fff;
  padding: 16px;
  border-radius: 20px;
  width: max-content;
  min-width: 240px;
  max-width: 90%;
  &--right {
    margin-left: auto;
  }
  &__user {
    font-size: 24px;
    margin-bottom: 4px;
  }
  &__text {
    font-size: 22px;
    color: #fff;
  }
  &__date {
    margin-top: 4px;
    font-size: 16px;
    text-align: end;
  }
}
</style>
