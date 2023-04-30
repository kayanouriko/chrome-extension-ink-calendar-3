// 转化 rgba
export function rgbaColor(rgba: { r: number; g: number; b: number; a: number }) {
    return `rgba(${rgba.r * 255}, ${rgba.g * 255}, ${rgba.b * 255}, ${rgba.a * 255})`
}

export function getRuleIcon(rule: string) {
    // 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
    switch (rule) {
        case 'TURF_WAR':
            return '/images/regular.svg'
        case 'LOFT':
            return '/images/yagura.svg'
        case 'CLAM':
            return '/images/asari.svg'
        case 'AREA':
            return '/images/area.svg'
        case 'GOAL':
            return '/images/hoko.svg'
        default:
            return ''
    }
}

// 获取规则的国际化语言的 key
export function getRuleId(rule: 'AREA' | 'LOFT' | 'GOAL' | 'CLAM') {
    switch (rule) {
        case 'AREA':
            return 'VnNSdWxlLTE='
        case 'LOFT':
            return 'VnNSdWxlLTI='
        case 'GOAL':
            return 'VnNSdWxlLTM='
        case 'CLAM':
            return 'VnNSdWxlLTQ='
    }
}
