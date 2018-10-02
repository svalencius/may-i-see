import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const dev = !!__DEV__

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',

    debug: dev,

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format: function (value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase()
        return value
      }
    }
  })

export default i18n
