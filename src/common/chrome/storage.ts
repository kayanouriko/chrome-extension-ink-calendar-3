import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { appDefaultLocale, appSupportedLocales } from '@common/i18n'
import { SchedulesData, schedulesData } from '@popup/store/schedules'
import { Festival, festival, RegionType, getFestRegionType, appSupportedRegions } from '@popup/store/festivals'
import { gesotown, Gesotown } from '@popup/store/gear'

const localeKey = 'ink-calendar-3-current-locale'
const regionKey = 'ink-calendar-3-current-region'
const selectedItemKey = 'ink-calendar-3-current-selected-item'
const schedulesKey = 'ink-calendar-3-schedule-data'
const festivalKey = 'ink-calendar-3-fest-data'
const gearKey = 'ink-calendar-3-gear-data'
const localeDataKey = 'ink-calendar-3-locale-data'

// 这个用于获取缓存里面的数据
export const useStorageStore = defineStore('chrome/storage', () => {
    // 是否需要刷新, 默认需要更新
    const shouldDownload = ref(true)
    // 商店是否需要刷新, 默认需要更新
    const gearShouldDownload = ref(true)
    // 当前应用使用的 language tag
    const appCurrentLanguageCode = ref<string>('en-US')
    // 当前应用使用的 region code
    const appCurrentRegionCode = ref<RegionType>('US')
    // 当前应用使用的 selected items
    const appCurrentSelectedItemKey = ref<string>('regular')
    // 日程
    const storageSchedules = shallowRef<SchedulesData | undefined>(undefined)
    // 祭典
    const storageFestival = shallowRef<Festival | undefined>(undefined)
    // 商店
    const storageGear = shallowRef<Gesotown | undefined>(undefined)
    // 额外的国际化文本
    const storageLocale = shallowRef<any>(undefined)
    // 开始读取缓存数据
    async function update() {
        if (import.meta.env.DEV) {
            // 如果是开发环境, 则默认使用中文, 其余数据为 undefined
            appCurrentLanguageCode.value = 'zh-CN'
            appCurrentRegionCode.value = 'AP'
            return
        }
        // 读取缓存
        const {
            [localeKey]: cData,
            [regionKey]: rData,
            [selectedItemKey]: iData
        } = await read([localeKey, regionKey, selectedItemKey], 'sync')
        const {
            [schedulesKey]: sData,
            [festivalKey]: fData,
            [gearKey]: gData,
            [localeDataKey]: lData
        } = await read([schedulesKey, festivalKey, gearKey, localeDataKey])
        // 对 lanuage tag 进行解析
        appCurrentLanguageCode.value = getAppCurrentLanguageCode(cData)
        // 对 region code 进行解析
        appCurrentRegionCode.value = getAppCurrentRegionCode(rData, appCurrentLanguageCode.value)
        // 对 selected item 进行解析
        if (typeof iData === 'string') appCurrentSelectedItemKey.value = iData
        // 对数据进行解析
        storageSchedules.value = getJSONObject(sData, data => schedulesData.parse(data))
        storageFestival.value = getJSONObject(fData, data => festival.parse(data))
        storageGear.value = getJSONObject(gData, data => gesotown.parse(data))
        storageLocale.value = getJSONObject(lData, data => data)
        // 检测是否需要更新数据
        // 这里的判断是由于首页数据至少需要这两项才能展示
        if (storageSchedules.value !== undefined && storageLocale.value !== undefined) {
            // 如果有数据, 则检测是否需要更新
            // TODO: 这里需要重新解析
            const { nextUpdateTime } = storageSchedules.value
            if (nextUpdateTime) {
                // 能获取到 updateTime
                // 只有当前时间大于更新时间才需要更新
                shouldDownload.value = new Date() > new Date(nextUpdateTime)
            }
        }
        // 检测商店是否需要更新数据
        // gear 只有点击进入模块的时候才需要判断刷新规则, 所以这里需要单独的判断逻辑
        if (storageGear.value && storageGear.value.limitedGears.length > 0) {
            // 当存在销售数据的时候才需要判断
            const { saleEndTime } = storageGear.value.limitedGears[0]
            // 只有当前时间大于销售时间才需要更新
            gearShouldDownload.value = new Date() > new Date(saleEndTime)
        }
    }
    // 存储相关
    function setAppCurrentLanguageCode(data: string) {
        write({ [localeKey]: data }, 'sync').then(() => {
            console.log('已缓存 localeKey')
            console.log(data)
        })
    }
    function setAppCurrentRegionCode(data: string) {
        write({ [regionKey]: data }, 'sync').then(() => {
            console.log('已缓存 regionKey')
            console.log(data)
        })
    }
    function setAppCurrentSelectedItemKey(data: string) {
        write({ [selectedItemKey]: data }, 'sync').then(() => {
            console.log('已缓存 selectedItemKey')
            console.log(data)
        })
    }
    function setStorageSchedules(data: string) {
        write({ [schedulesKey]: data }).then(() => {
            console.log('已缓存 schedules')
            console.log(JSON.parse(data))
        })
    }
    function setStorageFestival(data: string) {
        write({ [festivalKey]: data }).then(() => {
            console.log('已缓存 festivals')
            console.log(JSON.parse(data))
        })
    }
    function setStorageGear(data: string) {
        write({ [gearKey]: data }).then(() => {
            console.log('已缓存 gear')
            console.log(JSON.parse(data))
        })
    }
    function setStorageLocale(data: string) {
        write({ [localeDataKey]: data }).then(() => {
            console.log('已缓存 localeData')
            console.log(JSON.parse(data))
        })
    }
    function removeStorageLocale() {
        remove(localeDataKey).then(() => {
            console.log('已删除 localeData')
        })
    }
    return {
        shouldDownload,
        gearShouldDownload,
        appCurrentLanguageCode,
        appCurrentRegionCode,
        appCurrentSelectedItemKey,
        storageSchedules,
        storageFestival,
        storageGear,
        storageLocale,
        setAppCurrentLanguageCode,
        setAppCurrentRegionCode,
        setAppCurrentSelectedItemKey,
        setStorageSchedules,
        setStorageFestival,
        setStorageGear,
        setStorageLocale,
        removeStorageLocale,
        update
    }
})

// 获取应用使用的 lanuage tag
function getAppCurrentLanguageCode(cData: any) {
    // 缓存里面有数据
    const supportedLocale = appSupportedLocales.find(l => l.code === cData)
    if (supportedLocale) return supportedLocale.code
    // 没找到支持的语言
    // 不存在同步数据或者缓存的语言不再支持, 则获取浏览器语言, 如果支持返回当前语言, 否则返回默认语言
    const languageTag = chrome.i18n.getUILanguage()
    const { code } =
        appSupportedLocales.find(l => {
            // getUILanguage 返回的不是标准的 language tag, 单语言比如 ru-RU 只返回 ru
            if (l.code === languageTag) return true
            // 上面的语言不支持则尝试判断是不是以字段开头
            if (l.code.startsWith(languageTag)) return true
            return false
        }) ?? appDefaultLocale
    // 存储数据
    write({ [localeKey]: code }, 'sync').then(() => console.log('已缓存语言: ' + code))
    return code
}

// 获取应用使用的 region code
function getAppCurrentRegionCode(rData: any, languageCode: string) {
    const supportedRegion = appSupportedRegions.find(r => r === rData)
    if (supportedRegion) return supportedRegion
    // 没有找到支持的区域
    // 根据 lanuage tag 获取一个
    const defaultRegion = getFestRegionType(languageCode)
    write({ [regionKey]: defaultRegion }, 'sync').then(() => console.log('已缓存区域: ' + defaultRegion))
    return defaultRegion
}

// 从缓存里面获取数据
function getJSONObject<T>(data: any, transform: (data: any) => T): T | undefined {
    if (typeof data === 'string') {
        return transform(JSON.parse(data))
    }
    return undefined
}

//============ 辅助函数 ============
// 读取数据
async function read(keys: string | string[], type: 'local' | 'sync' = 'local') {
    return chrome.storage[type].get(keys)
}

// 获取数据
function write(items: { [key: string]: any }, type: 'local' | 'sync' = 'local') {
    return chrome.storage[type].set(items)
}

// 删除数据
function remove(keys: string | string[], type: 'local' | 'sync' = 'local') {
    return chrome.storage[type].remove(keys)
}
