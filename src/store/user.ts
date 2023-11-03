import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const token = ref('')

  function setToken(value: string) {
    token.value = value
  }

  return {
    token,
    setToken,
  }
})
