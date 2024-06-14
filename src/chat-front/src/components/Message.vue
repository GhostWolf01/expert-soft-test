<script setup lang="ts">
import { Message } from '@/types';
type Props = {
  message: Message;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="message">
    <div class="message__user"></div>
    <div class="message__text">{{ props.message.text }}</div>
    <div class="message__date">
      {{ props.message.createdAt }}
    </div>
  </div>
</template>

<style scoped></style>
