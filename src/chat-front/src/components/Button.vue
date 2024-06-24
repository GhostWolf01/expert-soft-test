<script setup lang="ts">
type Props = {
  text?: string;
  disabled?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
  <button class="button" :disabled="disabled" type="button">
    <slot>
      {{ props.text }}
    </slot>
  </button>
</template>

<style lang="scss">
.button {
  background-color: #090a11;
  border: 0;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  height: 56px;
  min-width: 80px;
  padding: 0 12px;
  font-size: 1.2em;
  &:disabled {
    color: #7f8497;
  }
  &:focus {
    color: #25c2a0;
    box-shadow: inset 0 0 0 2px #25c2a0;
  }
  &:hover {
    color: #25c2a0;
  }
  &--icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
