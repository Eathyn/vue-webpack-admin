export const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getItem = (key: string) => {
  const value = localStorage.getItem(key)
  if (value === null) {
    console.error(`${key} 对应的 value 不存在`)
    return
  }
  try {
    return JSON.parse(value)
  } catch (e) {
    console.error(e)
  }
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export const removeAllItems = () => {
  localStorage.clear()
}
