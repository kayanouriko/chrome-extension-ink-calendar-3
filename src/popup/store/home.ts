import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFestSchedulesStore } from './schedules'
import { useSchedulesDataStore, useI18nDataStore, useFestivalsDataStore } from './download'
import { useStorageStore } from '@common/chrome/storage'

// 这个 store 只负责最开始的请求请求, 国际化, 初始化等问题
export const useHomeStore = defineStore('home', () => {
    // 是否是更新状态
    const isUpdating = ref(false)
    const isError = ref(false)
    // App 的整个初始化入口
    async function startUpdate() {
        try {
            isUpdating.value = true
            isError.value = false
            // 先获取缓存的数据
            await useStorageStore().update()
            // 开始更新
            await Promise.all([useSchedulesDataStore().update(), useI18nDataStore().update()])
            // 更新完成的时候, 判断祭典为预热阶段才需要更新, 则需要更新祭典的数据
            if (useFestSchedulesStore().currentFest?.state === 'SCHEDULED') {
                // 需要更新祭典
                await useFestivalsDataStore().update()
            }
        } catch (error) {
            console.log(error)
            isError.value = true
        } finally {
            isUpdating.value = false
        }
    }
    return { isUpdating, isError, startUpdate }
})
