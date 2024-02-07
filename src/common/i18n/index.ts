import { createI18n } from 'vue-i18n'
import { messages } from './messages'

export { appDefaultLocale, appSupportedLocales, changeSplatfont } from './utils'

export function createAppI18n() {
    return createI18n({
        legacy: false, // 使用组合式api
        locale: 'en-US',
        fallbackLocale: 'en-US',
        warnHtmlMessage: false,
        missingWarn: false,
        fallbackWarn: false,
        messages
    })
}
