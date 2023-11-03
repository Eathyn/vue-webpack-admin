import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {
    icode: 'C3C95CC441403794',
  },
})

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
