<script setup lang="ts">
// import Button from '@/components/Button.vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faX } from '@fortawesome/free-solid-svg-icons';

type Props = {
  isShow: boolean;
};

const props = defineProps<Props>();

type Emits = {
  (e: 'hiddenModal'): void;
};

const emit = defineEmits<Emits>();

function closeModal() {
  emit('hiddenModal');
}
</script>

<template>
  <Teleport to="#modals">
    <div
      v-show="props.isShow"
      class="modal__backgroung"
      :class="{
        'modal--show': props.isShow,
      }"
      @click.self="closeModal"
    >
      <div class="modal">
        <!-- <Button class="modal__button button--icon" @click="closeModal">
          <FontAwesomeIcon class="modal__button-icon" :icon="faX" />
        </Button> -->
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.modal {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 560px;
  transform: scale(0);
  transition: all 0.5s;
  z-index: 999;
  background-color: #15172a;
  box-shadow:
    inset 1px 1px 0 0 #2c2e40,
    0 3px 8px 0 #000309;
  border-radius: 10px;
  &--xl {
    max-width: 680px;
  }
  &--show {
    & > .modal {
      transform: scale(1);
    }
    &.modal__backgroung {
      opacity: 1;
      pointer-events: all;
    }
  }
  &__backgroung {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #090a11, $alpha: 0.5);
    opacity: 0;
    pointer-events: none;
    transition: all 0.5s;
    z-index: 1000;
  }

  &__button {
    position: absolute;
    width: 36px;
    height: 36px;
    padding: 4px;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
}
</style>
