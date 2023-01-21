import { createI18n } from 'vue-i18n'

import deDE from '../assets/i18n/de-DE.json'
import enGB from '../assets/i18n/en-GB.json'
import enUS from '../assets/i18n/en-US.json'
import esES from '../assets/i18n/es-ES.json'
import esMX from '../assets/i18n/es-MX.json'
import frCA from '../assets/i18n/fr-CA.json'
import frFR from '../assets/i18n/fr-FR.json'
import itIT from '../assets/i18n/it-IT.json'
import jaJP from '../assets/i18n/ja-JP.json'
import koKR from '../assets/i18n/ko-KR.json'
import nlNL from '../assets/i18n/nl-NL.json'
import ruRU from '../assets/i18n/ru-RU.json'
import zhCN from '../assets/i18n/zh-CN.json'
import zhTW from '../assets/i18n/zh-TW.json'

import deDEEx from '../assets/i18n/locales/de-DE.json'
import enGBEx from '../assets/i18n/locales/en-GB.json'
import enUSEx from '../assets/i18n/locales/en-US.json'
import esESEx from '../assets/i18n/locales/es-ES.json'
import esMXEx from '../assets/i18n/locales/es-MX.json'
import frCAEx from '../assets/i18n/locales/fr-CA.json'
import frFREx from '../assets/i18n/locales/fr-FR.json'
import itITEx from '../assets/i18n/locales/it-IT.json'
import jaJPEx from '../assets/i18n/locales/ja-JP.json'
import koKREx from '../assets/i18n/locales/ko-KR.json'
import nlNLEx from '../assets/i18n/locales/nl-NL.json'
import ruRUEx from '../assets/i18n/locales/ru-RU.json'
import zhCNEx from '../assets/i18n/locales/zh-CN.json'
import zhTWEx from '../assets/i18n/locales/zh-TW.json'

export interface Locale {
    name: string
    code: string
}

class InkI18n {
    // 获取全部支持的语言
    get locales() {
        return locales
    }
    // 改变字体的同时需要修改 font family
    changeSplatfont(localeCode: string) {
        switch (localeCode) {
            case 'zh-CN':
                document.documentElement.style.setProperty('--font-family-s1', 'splatoon1, splatoon1chzh, sans-serif')
                document.documentElement.style.setProperty('--font-family-s2', 'splatoon2, splatoon2chzh, sans-serif')
                break
            case 'zh-TW':
                document.documentElement.style.setProperty('--font-family-s1', 'splatoon1, splatoon1twzh, sans-serif')
                document.documentElement.style.setProperty('--font-family-s2', 'splatoon2, splatoon2twzh, sans-serif')
                break
            default:
                document.documentElement.style.setProperty('--font-family-s1', 'splatoon1, splatoon1jpja, sans-serif')
                document.documentElement.style.setProperty('--font-family-s2', 'splatoon2, splatoon2jpja, sans-serif')
                break
        }
    }
}

deDE.splatnet = deDEEx
enGB.splatnet = enGBEx
enUS.splatnet = enUSEx
esES.splatnet = esESEx
esMX.splatnet = esMXEx
frCA.splatnet = frCAEx
frFR.splatnet = frFREx
itIT.splatnet = itITEx
jaJP.splatnet = jaJPEx
koKR.splatnet = koKREx
nlNL.splatnet = nlNLEx
ruRU.splatnet = ruRUEx
zhCN.splatnet = zhCNEx
zhTW.splatnet = zhTWEx

const messages = {
    'de-DE': deDE,
    'en-US': enUS,
    'en-GB': enGB,
    'es-ES': esES,
    'es-MX': esMX,
    'fr-FR': frFR,
    'fr-CA': frCA,
    'it-IT': itIT,
    'ja-JP': jaJP,
    'ko-KR': koKR,
    'nl-NL': nlNL,
    'ru-RU': ruRU,
    'zh-CN': zhCN,
    'zh-TW': zhTW
}

// 所有支持的语言
const locales = [
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (GB)' },
    { code: 'es-ES', name: 'Español (ES)' },
    { code: 'es-MX', name: 'Español (MX)' },
    { code: 'fr-FR', name: 'Français (FR)' },
    { code: 'fr-CA', name: 'Français (CA)' },
    { code: 'it-IT', name: 'Italiano' },
    { code: 'ja-JP', name: '日本語' },
    { code: 'ko-KR', name: '한국어' },
    { code: 'nl-NL', name: 'Nederlands' },
    { code: 'ru-RU', name: 'Русский' },
    { code: 'zh-CN', name: '中文(简体)' },
    { code: 'zh-TW', name: '中文(台灣)' }
]

const inkI18n = new InkI18n()

let i18n = createI18n({
    legacy: false, // 使用组合式api
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages
})

export function initI18n() {
    return i18n
}

export function useInkI18n() {
    return inkI18n
}
