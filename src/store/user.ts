import { defineStore } from 'pinia'
import { computed, reactive, ref, toRaw } from 'vue'
import { getUserInfo } from '@/api/sys'

interface UserInfo {
  id: string
  _id: string
  avatar: string
  permission: {
    menus: string[]
    points: string[]
  }
  role: {
    id: string
    title: string
  }[]
  title: string
  username: string
}

export const useLoginStore = defineStore('login', () => {
  const token = ref('')
  const userInfo = reactive<UserInfo | Record<string, never>>({})
  const isUserInfoEmpty = computed(
    () => JSON.stringify(toRaw(userInfo)) === '{}',
  )

  function setToken(value: string) {
    token.value = value
  }

  async function setUserInfo() {
    const res = await getUserInfo()
    Object.assign(userInfo, res)
  }

  return {
    token,
    userInfo,
    isUserInfoEmpty,
    setToken,
    setUserInfo,
  }
})
