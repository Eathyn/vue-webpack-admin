import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    config.headers.icode = 'C3C95CC441403794'
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
