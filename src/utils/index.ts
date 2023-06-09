export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    return JSON.parse(value!)
  } catch (e) {
    return null
  }
}
