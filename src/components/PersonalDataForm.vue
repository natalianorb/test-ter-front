<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { FormData } from '@/types/form'
import { formatDate, formatPhone, rules } from '@/utils/forms'
import { useVuelidate } from '@vuelidate/core'
import { computed, ref } from 'vue'

const initialFormState: FormData = {
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
}

const form = ref<FormData>({ ...initialFormState })

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  form.value.phone = formatPhone(input.value)
}

const validator = useVuelidate(rules, form)

const isFormValid = computed(() => !validator.value.$invalid)

const isLoading = ref(false)

const resetForm = () => {
  form.value = { ...initialFormState }
  validator.value.$reset()
}

const handleSubmit = async () => {
  const isFormCorrect = await validator.value.$validate()
  if (!isFormCorrect) {
    console.log('Форма содержит ошибки')
    return
  }

  try {
    isLoading.value = true
    const savedForms = JSON.parse(localStorage.getItem('forms') || '[]')
    savedForms.push({
      ...form.value,
      birthDate: formatDate(form.value.birthDate),
      id: Date.now(),
    })
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    localStorage.setItem('forms', JSON.stringify(savedForms))
    resetForm()
  } catch (error) {
    console.error('Ошибка при сохранении формы:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="personal-data-form">
    <BaseInput
      v-model="form.fullName"
      label="ФИО"
      type="text"
      id="fullName"
      placeholder="Иванов Иван Иванович"
      :error="validator.fullName.$errors[0]?.$message as string"
      @blur="validator.fullName.$touch()"
    />

    <BaseInput
      v-model="form.birthDate"
      label="Дата рождения"
      type="date"
      id="birthDate"
      :error="validator.birthDate.$errors[0]?.$message as string"
      @blur="validator.birthDate.$touch()"
    />

    <BaseInput
      v-model="form.phone"
      label="Номер телефона"
      type="tel"
      id="phone"
      placeholder="+7 (999) 999-99-99"
      @input="handlePhoneInput"
      :error="validator.phone.$errors[0]?.$message as string"
      @blur="validator.phone.$touch()"
    />

    <BaseInput
      v-model="form.email"
      label="Электронная почта"
      type="email"
      id="email"
      placeholder="example@mail.ru"
      :error="validator.email.$errors[0]?.$message as string"
      @blur="validator.email.$touch()"
    />

    <div class="personal-data-form__submit">
      <BaseButton type="submit" :disabled="!isFormValid" :loading="isLoading">
        Отправить
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.personal-data-form__submit {
  padding-top: 8px;
  text-align: center;
}
</style>
