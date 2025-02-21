<template>
  <button
    class="base-button"
    :class="[{ disabled, loading }]"
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span class="base-button__content" :class="{ hidden: loading }">
      <slot></slot>
    </span>
    <span v-if="loading" class="base-button__spinner"></span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    disabled: false,
    loading: false,
  },
)

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.base-button {
  /* Layout */
  position: relative;
  min-width: 120px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;

  /* Typography */
  font-size: 16px;

  /* Visual */
  background: linear-gradient(to right, #fff, var(--color-primary-soft));
  color: rgba(0, 0, 0, 1);
  cursor: pointer;

  /* Animation */
  transition:
    color 0.3s,
    background 0.3s;
}

/* States */
.base-button:hover {
  color: #fff;
  background: linear-gradient(to right, var(--color-primary-mute), var(--color-primary));
}

.base-button:active {
  background: var(--color-primary);
}

.base-button.disabled,
.base-button.loading {
  background: var(--color-disabled);
  color: rgba(0, 0, 0, 0.6);
}

.base-button.disabled {
  cursor: not-allowed;
}

.base-button.loading {
  cursor: wait;
}

/* Content */
.base-button__content {
  opacity: 1;
  transition: opacity 0.2s;
}

.base-button__content.hidden {
  opacity: 0;
}

/* Spinner */
.base-button__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border: 2px solid transparent;
  border-top-color: var(--color-disabled-dark);
  border-right-color: var(--color-disabled-dark);
  border-radius: 50%;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
