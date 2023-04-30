import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { defineFetchStore } from './useFetch'
import { API_SCHEDULES, API_LOCALE, API_FESTIVALS, UpdateState } from '../utils/const'
import { Data, Festival } from './useTypes'

// 创建首页需要的三个请求
const useSchedulesStore = defineFetchStore<{ data: Data }>('schedules', API_SCHEDULES)
const useLocaleStore = defineFetchStore<any>('locale', API_LOCALE)
const useFestivalsStore = defineFetchStore<Festival>('festivals', API_FESTIVALS)

export const useHomeDataStore = defineStore('homeData', () => {
    // 存储的数据, 包含日程表, 额外的语言, 祭典信息
    const stores = {
        schedules: useSchedulesStore(),
        locale: useLocaleStore(),
        festivals: useFestivalsStore()
    }
    // 状态
    const state = computed(() => {})
    function updateAll() {
        return Promise.all(Object.values(stores).map(s => s.update()))
    }

    async function update() {
        // 先获取本地缓存数据
        // 需要请求数据
        await updateAll()
    }
})
