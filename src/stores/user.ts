import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  username: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function setUser(newUser: User) {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
})
