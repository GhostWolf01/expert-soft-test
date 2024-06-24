<script setup lang="ts">
import { type User } from '@/types';
type Props = {
  user: User;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="user">
    <p class="user__name">User: {{ props.user.name }}</p>
  </div>
</template>

<style lang="scss">
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  &__name {
    text-align: center;
    color: #fff;
    font-size: 1.2em;
  }
}
</style>
