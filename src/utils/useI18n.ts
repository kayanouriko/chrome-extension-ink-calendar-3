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

export interface Locale {
    name: string
    code: string
}

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
export const locales = [
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

// 初始化 i18n 插件
export function useInkI18n() {
    return createI18n({
        legacy: false, // 使用组合式api
        locale: 'en-US',
        fallbackLocale: 'en-US',
        messages
    })
}

// 改变字体的同时需要修改 font family
export function changeSplatfont(localeCode: string) {
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
