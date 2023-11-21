import request from '@/utils/request'
import { LoginResData, UserInfo } from '@/store/user'

export const loginURL = '/sys/login'

export function login(data: any): Promise<LoginResData> {
  return request({
    url: loginURL,
    method: 'POST',
    data,
  })
}

export async function getUserInfo(): Promise<UserInfo> {
  return request({
    url: '/sys/profile',
  })
}
