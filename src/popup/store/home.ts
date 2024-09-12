import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSchedulesDataStore, useI18nDataStore, useFestivalsDataStore } from './download'
import { useStorageStore } from '@common/chrome/storage'
import { ZodError } from 'zod'

// 这个 store 只负责最开始的请求请求, 国际化, 初始化等问题
export const useHomeStore = defineStore('home', () => {
    // 是否是更新状态
    const isUpdating = ref(false)
    const errorMsg = ref<string | undefined>(undefined)
    // App 的整个初始化入口
    async function startUpdate() {
        try {
            isUpdating.value = true
            errorMsg.value = undefined
            // 先获取缓存的数据
            await useStorageStore().update()
            // 开始更新
            // 这里请求三个数据源, 日程, 国际化, 祭典
            // 其中国际化和祭典是过度请求, 国际化由于不知道文本的更新间隔, 而祭典是在预热阶段在日程数据源中反应过于缓慢, 所以这两个随着日程数据源的更新而更新
            // 日程的更新频率最少也为 2 个小时, 所以请求还不算频繁
            await Promise.all([
                useSchedulesDataStore().update(),
                useI18nDataStore().update(),
                useFestivalsDataStore().update()
            ])
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error)
                errorMsg.value = 'JSON parsing error\nPlease wait for the extension to update'
            } else {
                errorMsg.value = 'Unknown error'
            }
        } finally {
            isUpdating.value = false
        }
    }
    return { isUpdating, errorMsg, startUpdate }
})
