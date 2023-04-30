import { Data } from './datas'
import { Festival } from './festDatas'
import { Splatnet } from './gearDatas'
import { getCurrentLocale } from './storage'
import { getXRegionType } from './useI18n'
import { Season } from './xrankDatas'
import { defineStore } from 'pinia'

const SCHEDULE_URL = 'https://splatoon3.ink/data/schedules.json'
const GEAR_URL = 'https://splatoon3.ink/data/gear.json'
const FESTIVALS_URL = 'https://splatoon3.ink/data/festivals.json'
const LOCALE_URL = 'https://splatoon3.ink/data/locale/'
const XRANK_URL = 'https://splatoon3.ink/data/xrank/xrank'

// splatoon3ink data access 的要求, 最好附上联系方式的 User-Agent
const headers = {
    'User-Agent': `ChromeExtensionInkCalendar3 kayanouriko@icloud.com`
}

export async function getScheduleData() {
    const response = await fetch(SCHEDULE_URL, { headers })
    return response.json() as Promise<{ data: Data }>
}

export async function getGearData() {
    const response = await fetch(GEAR_URL, { headers })
    return response.json() as Promise<{ data: { gesotown: Splatnet } }>
}

export async function getLocaleData() {
    const code = (await getCurrentLocale()).code
    const response = await fetch(LOCALE_URL + code + '.json', { headers })
    return response.json()
}

export async function getFestivalsData() {
    const response = await fetch(FESTIVALS_URL, { headers })
    return response.json() as Promise<Festival>
}

export async function getXRankData() {
    const code = (await getCurrentLocale()).code
    const region = getXRegionType(code)
    const response = await fetch(XRANK_URL + `.${region}.json`, { headers })
    return response.json() as Promise<{
        data: { xRanking: { currentSeason: Season } }
    }>
}
