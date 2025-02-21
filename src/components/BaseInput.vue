<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
      class="base-input"
      :class="{ error: error }"
      v-bind="$attrs"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  modelValue: string
  type?: string
  id: string
  error?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.input-label {
  font-size: 14px;
  color: #4a5568;
}

.base-input {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.base-input:focus {
  border-color: var(--color-border-hover);
}

.base-input.error {
  border-color: var(--color-border-hover);
}

.error-message {
  color: rgba(39, 134, 218, 1);
  font-size: 14px;
}
</style>
