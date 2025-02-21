<template>
  <button
    class="base-button"
    :class="[variant, { disabled }]"
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
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
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
  transition: opacity 0.2s;
}

.base-button:hover {
  opacity: 0.9;
}

.primary {
  background-color: #4299e1;
  color: white;
}

.secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled:hover {
  opacity: 0.5;
}
</style>
