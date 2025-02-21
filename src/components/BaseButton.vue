<template>
  <button
    class="base-button"
    :class="[{ disabled }]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    disabled: false,
  },
)

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition:
    color 0.3s,
    background 0.3s;
  background: linear-gradient(to right, #fff, var(--color-primary-soft));
  color: rgba(0, 0, 0, 1);
}

.base-button:hover {
  color: #fff;
  background: linear-gradient(to right, var(--color-primary-mute), var(--color-primary));
}

.base-button:active {
  background: var(--color-primary);
}

.base-button.disabled {
  background: #ccc;
  color: rgba(0, 0, 0, 0.6);
  cursor: not-allowed;
}

.disabled:hover {
  opacity: 0.5;
}
</style>
