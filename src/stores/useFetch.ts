import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

import { API_BASE, UpdateState } from '@/utils/const'

// splatoon3ink data access 的要求, 最好附上联系方式的 User-Agent
const headers = {
    'User-Agent': `ChromeExtensionInkCalendar3 kayanouriko@icloud.com`
}

export function defineFetchStore<T>(id: string, path: string) {
    return defineStore(`data/${id}`, () => {
        const data = shallowRef<T | null>(null)
        const state = ref<UpdateState>('none')

        async function update() {
            try {
                state.value = 'loading'
                const response = await fetch(API_BASE + path, { headers })
                if (!response.ok) {
                    state.value = 'error'
                    return
                }
                data.value = await response.json()
                state.value = 'success'
            } catch {
                state.value = 'error'
            }
        }
        return { data, state, update }
    })
}
