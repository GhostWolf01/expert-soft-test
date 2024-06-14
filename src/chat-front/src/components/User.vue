<script setup lang="ts">
import { User } from '@/types';
type Props = {
  user: User;
};

const props = defineProps<Props>();
</script>

<template>
  <div class="user">
    <p class="user__name">{{ props.user.name }}</p>
  </div>
</template>

<style lang="scss">
.user {
  &__name {
  }
}
</style>
