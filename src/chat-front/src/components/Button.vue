<script setup lang="ts">
type Props = {
  text: string;
};

const props = defineProps<Props>();
</script>

<template>
  <button class="button" type="button">{{ props.text }}</button>
</template>

<style lang="scss">
.button {
}
</style>
