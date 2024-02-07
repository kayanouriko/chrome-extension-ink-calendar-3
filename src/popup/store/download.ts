import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { SchedulesData, schedulesData } from './schedules'
import { Festival, festival } from './festivals'
import { gesotown, Gesotown } from './gear'
import { useStorageStore } from '@common/chrome/storage'

// 专门负责获取数据, 包括从缓存中获取数据和下载数据的逻辑

const api = 'https://splatoon3.ink/data/'
const schedulesPath = 'schedules.json'
const localePath = 'locale/'
const festivalsPath = 'festivals.json'
const gearPath = 'gear.json'

function defineDownloadStore<T>(
    id: string,
    path: string,
    transform: (data: any) => T,
    getStorageData: () => T | undefined,
    setStorageData: (data: string) => void
) {
    return defineStore(`download/${id}`, () => {
        const data = shallowRef<T | undefined>(undefined)
        const isUpdating = ref(false)
        async function update() {
            try {
                isUpdating.value = true
                // 如果存在缓存并且不需要更新, 则直接使用缓存
                const storageData = getStorageData()
                if (storageData !== undefined) {
                    console.log(`${id} 存在缓存数据`)
                    console.log(storageData)
                    data.value = storageData
                    return
                }
                let baseUrl = import.meta.env.VITE_FAKE_API ?? api
                // locale 的请求需要额外处理
                let fullPath: string
                if (path === localePath) {
                    fullPath = `${path}${useStorageStore().appCurrentLanguageCode}.json`
                } else {
                    fullPath = path
                }
                data.value = await fetch(baseUrl + fullPath)
                    .then(response => response.json())
                    .then(data => {
                        if (import.meta.env.PROD) {
                            // 获取到数据, 转换成字符串缓存到本地
                            const storageData = JSON.stringify(data)
                            if (typeof storageData === 'string') {
                                setStorageData(storageData)
                            }
                        }
                        // 返回数据模型
                        return transform(data)
                    })
            } catch (error) {
                throw error
            } finally {
                isUpdating.value = false
            }
        }
        return { data, isUpdating, update }
    })
}

// 日程
export const useSchedulesDataStore = defineDownloadStore<SchedulesData>(
    'schedules',
    schedulesPath,
    data => schedulesData.parse(data),
    () => {
        if (useStorageStore().shouldDownload) return undefined
        return useStorageStore().storageSchedules
    },
    data => useStorageStore().setStorageSchedules(data)
)
// 祭典
export const useFestivalsDataStore = defineDownloadStore<Festival>(
    'festivals',
    festivalsPath,
    data => festival.parse(data),
    () => {
        // TODO: 正常来说, 跟着首页的判断确实可以了, 但是会造成大量的无效更新, 但是他的刷新判断有点复杂, 后续再优化
        if (useStorageStore().shouldDownload) return undefined
        return useStorageStore().storageFestival
    },
    data => useStorageStore().setStorageFestival(data)
)
// 商店
export const useGearDataStore = defineDownloadStore<Gesotown>(
    'gear',
    gearPath,
    data => gesotown.parse(data),
    () => {
        if (useStorageStore().gearShouldDownload) return undefined
        return useStorageStore().storageGear
    },
    data => useStorageStore().setStorageGear(data)
)
// 国际化文本
// 这个不需要转模型, 整个数据会直接丢到 i18n 里面
export const useI18nDataStore = defineDownloadStore<any>(
    'locale',
    localePath,
    data => data,
    () => {
        if (useStorageStore().shouldDownload) return undefined
        return useStorageStore().storageLocale
    },
    data => useStorageStore().setStorageLocale(data)
)
