<template>
  <div class="info-view">
    <div class="info-view__table-wrapper">
      <table class="info-view__table">
        <thead class="info-view__header">
          <tr>
            <th class="info-view__header-cell">ФИО</th>
            <th class="info-view__header-cell">Дата рождения</th>
            <th class="info-view__header-cell">Номер телефона</th>
            <th class="info-view__header-cell">Электронная почта</th>
          </tr>
        </thead>
        <tbody v-if="savedForms.length">
          <tr v-for="form in savedForms" :key="form.id">
            <td class="info-view__cell">{{ form.fullName }}</td>
            <td class="info-view__cell">{{ form.birthDate }}</td>
            <td class="info-view__cell">{{ form.phone }}</td>
            <td class="info-view__cell">{{ form.email }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!savedForms.length" class="info-view__empty">Нет сохраненных данных</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/form'
import { onMounted, ref } from 'vue'

interface SavedForm extends FormData {
  id: number
}

const savedForms = ref<SavedForm[]>([])

onMounted(() => {
  try {
    const forms = localStorage.getItem('forms')
    savedForms.value = forms ? JSON.parse(forms) : []
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    savedForms.value = []
  }
})
</script>

<style scoped>
.info-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
}

.info-view__table-wrapper {
  overflow-x: auto;
}

.info-view__table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.info-view__header {
  padding: 4px;
  background-color: var(--color-background-soft);
  font-weight: bold;
  color: var(--color-text);
  border-top: none;
}

.info-view__header-cell {
  padding: 4px;
  background-color: var(--color-background-soft);
  font-weight: bold;
  color: var(--color-text);
  border-top: none;
  border: 1px solid var(--color-border);
}

.info-view__cell {
  padding: 8px;
  border: 1px solid var(--color-border);
}

.info-view__data {
  padding: 12px;
}

.info-view__row:hover {
  background-color: var(--color-background-mute);
}

.info-view__empty {
  color: var(--color-text);
  margin-top: 20px;
}
</style>
