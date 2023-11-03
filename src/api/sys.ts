import request from '@/utils/request'

/* eslint-disable */
export function login(data: any) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}
