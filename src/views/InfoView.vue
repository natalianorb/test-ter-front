<template>
  <div class="info">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Номер телефона</th>
            <th>Электронная почта</th>
          </tr>
        </thead>
        <tbody v-if="savedForms.length">
          <tr v-for="form in savedForms" :key="form.id">
            <td>{{ form.fullName }}</td>
            <td>{{ form.birthDate }}</td>
            <td>{{ form.phone }}</td>
            <td>{{ form.email }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!savedForms.length" class="no-data">Нет сохраненных данных</p>
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
.info {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 24px;
  color: var(--color-heading);
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  text-align: center;
  border: 1px solid var(--color-border);
}

th {
  padding: 4px;
  background-color: var(--color-background-soft);
  font-weight: bold;
  color: var(--color-text);
  border-top: none;
}

td {
  padding: 12px;
}

tr:hover {
  background-color: var(--color-background-mute);
}

.no-data {
  text-align: center;
  color: var(--color-text);
  margin-top: 20px;
}
</style>
