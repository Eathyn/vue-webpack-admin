import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
import { RouteLocationNormalized } from 'vue-router'

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

export const useRouteStore = defineStore('route', () => {
  const currentRoute = ref<RouteLocationNormalized>()
  function setCurrentRoute(route: RouteLocationNormalized) {
    currentRoute.value = route
  }

  return {
    currentRoute,
    setCurrentRoute,
  }
})
