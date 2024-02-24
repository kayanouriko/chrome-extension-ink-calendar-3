import { defineStore } from 'pinia'
import { useFestSchedulesStore, useRegularSchedulesStore, useEventSchedulesStore } from '@popup/store/schedules'
import { computed } from 'vue'

export interface TabbarItem {
    key: string
    name: string
    icon: string
}

const festItem = {
    key: 'fest',
    name: 'navbar.splatfest',
    icon: '/assets/images/mode/tricolor.webp'
}

const regularItem = {
    key: 'regular',
    name: 'navbar.regular',
    icon: '/assets/images/mode/regular.webp'
}

const bankaraItem = {
    key: 'bankara',
    name: 'navbar.bankara',
    icon: '/assets/images/mode/bankara.webp'
}

const xItem = {
    key: 'x',
    name: 'navbar.x',
    icon: '/assets/images/mode/x.webp'
}

const eventItem = {
    key: 'event',
    name: 'navbar.events',
    icon: '/assets/images/mode/event.webp'
}

const coopItem = {
    key: 'coop',
    name: 'navbar.salmonrun',
    icon: '/assets/images/mode/coop.webp'
}

export const useTabbarStore = defineStore('tabbar', () => {
    const current = computed(() => useFestSchedulesStore().currentFestRecord)
    const schedules = computed(() => useRegularSchedulesStore().schedules)
    const isEventAvailable = computed(() => useEventSchedulesStore().isEventAvailable)
    const tabbarItems = computed<TabbarItem[]>(() => {
        const tabbarItems: TabbarItem[] = []
        if (current.value && current.value.state !== 'CLOSED') {
            tabbarItems.push(festItem)
        }
        if (schedules.value.length > 0) {
            tabbarItems.push(regularItem, bankaraItem, xItem)
        }
        if (isEventAvailable.value) {
            tabbarItems.push(eventItem)
        }
        tabbarItems.push(coopItem)
        return tabbarItems
    })
    return { tabbarItems }
})
