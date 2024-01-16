import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'

const messages = {
  zh: {
    msg: {
      ...mZhLocale,
    },
  },
  en: {
    msg: {
      ...mEnLocale,
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

export default i18n
