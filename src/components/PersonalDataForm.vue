<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { FormData } from '@/types/form'
import { formatPhone, rules } from '@/utils/forms'
import { useVuelidate } from '@vuelidate/core'
import { computed, ref } from 'vue'

const form = ref<FormData>({
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
})

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  form.value.phone = formatPhone(input.value)
}

const validator = useVuelidate(rules, form)

const isFormValid = computed(() => !validator.value.$invalid)

const handleSubmit = async () => {
  const isFormCorrect = await validator.value.$validate()
  if (!isFormCorrect) {
    console.log('Форма содержит ошибки')
    return
  }
  console.log('Данные формы:', form.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
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

    <BaseButton type="submit" :disabled="!isFormValid"> Отправить </BaseButton>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
