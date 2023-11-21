import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useLoginStore, useLogoutStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { isTokenTimeout } from '@/utils/auth'
import { loginURL } from '@/api/sys'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  async (config) => {
    if (config.url !== loginURL && isTokenTimeout()) {
      const logoutStore = useLogoutStore()
      const { logout } = logoutStore
      await logout()
      return Promise.reject(new Error('token timeouts'))
    }

    config.headers.icode = '0ABA6884D7D02FA9'
    const loginStore = useLoginStore()
    const { token } = storeToRefs(loginStore)
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    }
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  },
)

export default service
