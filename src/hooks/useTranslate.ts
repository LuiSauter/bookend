import { useEffect, useState } from 'react'
import spanish from 'public/i18n/es.json'
import english from 'public/i18n/en.json'
import { languageStorage } from 'src/config/constants'

const currentLanguageStorage =
  typeof document !== 'undefined' && window.localStorage.getItem(languageStorage)

export const useTranslate = () => {
  const [lang, setLang] = useState(spanish)
  const [i18n] = useState(
    currentLanguageStorage === null ? 'es' : currentLanguageStorage
  )

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      setLang(i18n === 'es' ? spanish : english)
      const html = document.querySelector('html')
      html?.setAttribute('lang', i18n.toString())
    }
    return () => {
      subscribe = false
    }
  }, [])

  return lang
}
