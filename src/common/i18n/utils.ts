// 默认使用的语言, en-US
export const appDefaultLocale = { code: 'en-US', name: 'English (US)' }

// 扩展支持的语言 code 为 language tag 的标准格式
export const appSupportedLocales = [
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

// 根据 language code 修改字体
export function changeSplatfont(languageCode: string) {
    switch (languageCode) {
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
