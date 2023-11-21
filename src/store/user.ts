import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { getUserInfo } from '@/api/sys'
import { removeAllItems } from '@/utils/storage'
import { useRouter } from 'vue-router'

export interface UserInfo {
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

export interface LoginResData {
  token: string
}

export const useLoginStore = defineStore('login', () => {
  const token = ref('')
  const userInfo = ref<UserInfo | null>(null)
  const isUserInfoEmpty = computed(
    () => JSON.stringify(userInfo.value) === '{}',
  )

  function setToken(value: string) {
    token.value = value
  }

  async function setUserInfo() {
    userInfo.value = await getUserInfo()
  }

  return {
    token,
    userInfo,
    isUserInfoEmpty,
    setToken,
    setUserInfo,
  }
})

export const useLogoutStore = defineStore('logout', () => {
  const router = useRouter()

  async function logout() {
    const loginStore = useLoginStore()
    const { token, userInfo } = storeToRefs(loginStore)
    // clean token
    token.value = ''
    removeAllItems()
    // clean user information
    userInfo.value = null
    await router.push({ name: 'Login' })
  }

  return {
    logout,
  }
})
