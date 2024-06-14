<script setup lang="ts">
type Props = {
  value: string;
  placeholder: string;
};

const props = defineProps<Props>();

type Emits = {
  (e: 'input', value: string): void;
};

const emit = defineEmits<Emits>();

interface EventInput extends InputEvent {
  target: HTMLInputElement;
}

function input(e: Event) {
  const event = e as EventInput;
  const value = event.target.value;
  emit('input', value);
}
</script>

<template>
  <input class="input" type="text" :placeholder="placeholder" :value="props.value" @input="input" />
</template>

<style lang="scss"></style>
