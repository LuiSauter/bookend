import { useState } from 'react'
import spanish from 'public/i18n/es.json'
import english from 'public/i18n/en.json'
import { languageStorage } from 'src/config/constants'

const currentLanguageStorage =
  typeof window !== 'undefined' && window.localStorage.getItem(languageStorage)

export const useTranslate = () => {
  const [lang, setLang] = useState(
    currentLanguageStorage === null ? 'es' : currentLanguageStorage
  )

  const es = spanish
  const en = english

  return lang === 'es' ? es : en
}
