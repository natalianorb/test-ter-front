<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
      class="base-input__field"
      :class="{ 'base-input__field--error': error }"
      v-bind="$attrs"
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
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
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
}

.base-input__label {
  font-size: 14px;
  color: #4a5568;
}

.base-input__field {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.base-input__field:focus {
  border-color: var(--color-border-hover);
}

.base-input__field--error {
  border-color: var(--color-border-hover);
}

.base-input__error {
  margin-top: 4px;
  color: rgba(39, 134, 218, 1);
  font-size: 14px;
}
</style>
