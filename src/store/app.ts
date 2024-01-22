import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

export const useLangStore = defineStore('lang', () => {
  const language = ref(getItem(LANG)) || ref('zh')

  function setLanguage(lang: string) {
    setItem(LANG, lang)
    language.value = lang
  }

  return {
    language,
    setLanguage,
  }
})

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpenSidebar = ref(true)
  function triggerSidebar() {
    isOpenSidebar.value = !isOpenSidebar.value
  }

  return {
    isOpenSidebar,
    triggerSidebar,
  }
})
