import { email, helpers, required } from '@vuelidate/validators'

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
const requiredField = helpers.withMessage('Пожалуйста, заполните поле', required)

const validateBirthDate = (value: string) => {
  if (!value) return true
  const birthDate = new Date(value)
  const today = new Date()
  const year = birthDate.getFullYear()
  const currentYear = today.getFullYear()

  return year >= 1900 && year <= currentYear && birthDate <= today
}

export const rules = {
  fullName: {
    required: requiredField,
  },
  birthDate: {
    required: requiredField,
    validYear: helpers.withMessage(
      'Дата рождения не может быть позже текущей даты и ранее 1900 года',
      validateBirthDate,
    ),
  },
  phone: {
    required: requiredField,
    format: helpers.withMessage(
      'Введите телефон в формате: +7 (999) 999-99-99',
      helpers.regex(phoneRegex),
    ),
  },
  email: {
    required: requiredField,
    email: helpers.withMessage('Пожалуйста, введите корректный email', email),
  },
}

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')

  if (digits.length <= 1) return '+7 ('
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length <= 9)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}
