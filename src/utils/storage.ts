import { Locale, locales } from './useI18n'
import { Data, BattleType, useDatas } from './datas'
import { Splatnet } from './gearDatas'
import { Festival } from './festDatas'
import { Season } from './xrankDatas'

const STORAGE_SYNC_LOCALE = 'ink-calendar-3-current-locale'
const STORAGE_SYNC_BATTLE_TYPE = 'ink-calendar-3-battle-type'
const STORAGE_LOCAL_DATA = 'ink-calendar-3-schedule-data'
const STORAGE_LOCAL_GEAR_DATA = 'ink-calendar-3-gear-data'
const STORAGE_LOCAL_FEST_DATA = 'ink-calendar-3-fest-data'
const STORAGE_LOCAL_XRANK_DATA = 'ink-calendar-3-xrank-data'
const STORAGE_LOCAL_LOCALE_DATA = 'ink-calendar-3-locale-'
const DEFAULT_LOCALE: Locale = { code: 'en-US', name: 'English(US)' }

// 从同步数据中获取当前语言
export async function getCurrentLocale(): Promise<Locale> {
    if (import.meta.env.DEV) {
        return DEFAULT_LOCALE
    }
    // 先从同步数据里面获取
    const result = await chrome.storage.sync.get(STORAGE_SYNC_LOCALE)
    const locale = result[STORAGE_SYNC_LOCALE] as Locale | null
    if (locale) {
        return locale
    }
    // 如果同步数据没保存首选语言, 则匹配浏览器首选语言
    const chromeLanguageCode = chrome.i18n.getUILanguage()
    const chromeLocale = locales.find(l => l.code === chromeLanguageCode)
    if (chromeLocale) {
        setCurrentLocale(chromeLocale)
        return chromeLocale
    }
    // 如果浏览器语言不支持, 则使用默认语言
    setCurrentLocale(DEFAULT_LOCALE)
    return DEFAULT_LOCALE
}

// 保存当前语言到同步数据中
export function setCurrentLocale(locale: Locale) {
    chrome.storage.sync.set({ [STORAGE_SYNC_LOCALE]: locale }).then(() => {
        console.log(`[ink calendar 3]使用的语言: ${locale.name} 已存储!`)
    })
}

// 从同步数据获取 type
export async function getLastBattleType() {
    if (import.meta.env.DEV) {
        return 0 as BattleType
    }
    const { isFestTime, currentBattleTypes } = useDatas()
    const result = await chrome.storage.sync.get(STORAGE_SYNC_BATTLE_TYPE)
    const battleType = result[STORAGE_SYNC_BATTLE_TYPE] as BattleType | null
    if (battleType) {
        const type = currentBattleTypes.find(t => t === battleType)
        if (type) {
            return type
        }
    }
    const defaultType = isFestTime ? BattleType.Splatfest : BattleType.Bankara
    setLastBattleType(defaultType)
    return defaultType
}

// 保存选择的 type 到同步数据
export function setLastBattleType(type: BattleType) {
    chrome.storage.sync.set({ [STORAGE_SYNC_BATTLE_TYPE]: type }).then(() => {
        console.log(`[ink calendar 3]选中的标签: ${type} 已保存!`)
    })
}

// 从本地数据中获取 schedule 的数据并比较
export async function getScheduleDataFromLocal(): Promise<{ shouldFetch: boolean; data: Data | null }> {
    // 如果本地没有数据或者本地有数据时当前时间大于 schedule 的时间 需要刷新数据
    // 如果本地有数据时当前时间小于 schedule 的时间, 不需要刷新数据
    const result = await chrome.storage.local.get(STORAGE_LOCAL_DATA)
    const data = result[STORAGE_LOCAL_DATA] as Data | null
    if (data) {
        // 判断时间是否需要更新, 目前来看 festSchedules 是永远存在时间的, 可以去里面的数据来进行对比
        // 注意是和第二个数据比较, 因为第一个数据是当前数据
        const scheduleDate = new Date(data.festSchedules.nodes[1].startTime)
        const date = new Date()
        if (date < scheduleDate) {
            console.log(`[ink calendar 3]目前日程表的数据不需要联网请求`)
            return {
                shouldFetch: false,
                data
            }
        }
    }
    return {
        shouldFetch: true,
        data: null
    }
}

// 保存 schedule 的数据到本地数据
export function setScheduleDataToLocal(data: Data) {
    chrome.storage.local.set({ [STORAGE_LOCAL_DATA]: data }).then(() => {
        console.log(`[ink calendar 3]日程表的数据已存储!`)
    })
}

// 从本地数据中获取 gear 的数据并比较
export async function getGearDataFromLocal(): Promise<{ shouldFetch: boolean; data: Splatnet | null }> {
    const result = await chrome.storage.local.get(STORAGE_LOCAL_GEAR_DATA)
    const data = result[STORAGE_LOCAL_GEAR_DATA] as Splatnet | null
    if (data) {
        // 如果数据存在
        // 取 pickup 时间和列表里面第一个的时间之中比较近的时间与当前时间做对比
        const pickupTime = new Date(data.pickupBrand.saleEndTime)
        const limitedTime = new Date(data.limitedGears[0].saleEndTime)
        const time = pickupTime < limitedTime ? pickupTime : limitedTime
        if (new Date() < time) {
            // 这时候不需要更新
            console.log(`[ink calendar 3]目前商店的数据不需要联网请求`)
            return {
                shouldFetch: false,
                data
            }
        }
    }
    return {
        shouldFetch: true,
        data: null
    }
}

export function setGearDataToLocal(data: Splatnet) {
    chrome.storage.local.set({ [STORAGE_LOCAL_GEAR_DATA]: data }).then(() => {
        console.log(`[ink calendar 3]商店的数据已存储!`)
    })
}

export async function getFestDataFromLocal() {
    const result = await chrome.storage.local.get(STORAGE_LOCAL_FEST_DATA)
    const data = result[STORAGE_LOCAL_FEST_DATA] as {
        time: number
        festival: Festival
    } | null
    if (data) {
        // 如果数据存在
        const { time, festival } = data
        const date = new Date(time)
        if (new Date() < date) {
            // 这时候不需要更新
            console.log(`[ink calendar 3]目前祭典的数据不需要联网请求`)
            return {
                shouldFetch: false,
                festival
            }
        }
    }
    return {
        shouldFetch: true,
        festival: null
    }
}

export function setFestDataToLocal(festival: Festival) {
    const time = new Date()
    // 调整更新时间到下一个整时
    time.setHours(time.getHours() + 1)
    time.setMinutes(0)
    time.setSeconds(0)
    const value = {
        time: time.getTime(),
        festival
    }
    console.log(value.time)
    chrome.storage.local.set({ [STORAGE_LOCAL_FEST_DATA]: value }).then(() => {
        console.log(`[ink calendar 3]祭典的数据已存储!`)
    })
}

export async function getXRankDataFromLocal() {
    const result = await chrome.storage.local.get(STORAGE_LOCAL_XRANK_DATA)
    const data = result[STORAGE_LOCAL_XRANK_DATA] as {
        time: number
        season: Season
    } | null
    if (data) {
        // 如果数据存在
        const { time, season } = data
        const date = new Date(time)
        if (new Date() < date) {
            // 这时候不需要更新
            console.log(`[ink calendar 3]目前x排名的数据不需要联网请求`)
            return {
                shouldFetch: false,
                season
            }
        }
    }
    return {
        shouldFetch: true,
        season: null
    }
}

export function setXRankDataToLocal(season: Season) {
    const time = new Date()
    // 调整更新时间到下一个整时
    time.setHours(time.getHours() + 1)
    time.setMinutes(0)
    time.setSeconds(0)
    const value = {
        time: time.getTime(),
        season
    }
    chrome.storage.local.set({ [STORAGE_LOCAL_XRANK_DATA]: value }).then(() => {
        console.log(`[ink calendar 3]x排名的数据已存储!`)
    })
}

export async function getLocaleDataFromLocal() {
    const code = (await getCurrentLocale()).code
    const key = STORAGE_LOCAL_LOCALE_DATA + code
    const result = await chrome.storage.local.get(key)
    const data = result[STORAGE_LOCAL_LOCALE_DATA + code] as { time: number; locale: any } | null
    return data
}

export async function setLocaleDataToLocal(locale: Locale) {
    const code = (await getCurrentLocale()).code
    const key = STORAGE_LOCAL_LOCALE_DATA + code
    const time = new Date().getTime()
    const value = {
        time,
        locale
    }
    chrome.storage.local.set({ [key]: value }).then(() => {
        console.log(`[ink calendar 3]额外的国际化语言数据: ${code} 已存储!`)
    })
}
