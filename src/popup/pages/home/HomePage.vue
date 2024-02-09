<template>
    <div class="bg-animate" w-full h-full mb-2 flex="~ col">
        <NavigationView v-if="selectedItem" shrink-0 :selected-item="selectedItem" />
        <RouterView v-slot="{ Component }">
            <KeepAlive>
                <component class="-mb-14" pb-14 grow overflow-y-auto overflow-x-clip thin-scrollbar :is="Component" />
            </KeepAlive>
        </RouterView>
        <TabbarView
            v-if="selectedItem"
            self-center
            shrink-0
            :selected-item="selectedItem"
            @did-change-tabbar-item="didChangeTabbarItem"
        />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { TabbarItem, useTabbarStore } from './utils'
import { useStorageStore } from '@common/chrome/storage'

import NavigationView from './NavigationView.vue'
import TabbarView from './TabbarView.vue'

const router = useRouter()

const { tabbarItems } = storeToRefs(useTabbarStore())

const selectedItem = shallowRef<TabbarItem | undefined>(undefined)

function didChangeTabbarItem(item: TabbarItem) {
    selectedItem.value = item
    router.push(`/home/${item.key}`)
    if (import.meta.env.DEV) return
    useStorageStore().setAppCurrentSelectedItemKey(item.key)
}

// tabbarItems 只有下载数据后会变化, 此时缓存的读取已经完成
// 此时要记录缓存里面选中的 item
watch(
    () => tabbarItems.value,
    newValue => {
        if (newValue.length === 0) return
        // 先从缓存里面读取上一次的 item
        let currentItem = newValue.find(i => i.key === useStorageStore().appCurrentSelectedItemKey)
        // 如果上一次 item 不存在了
        if (!currentItem) currentItem = newValue[0]
        selectedItem.value = currentItem
        if (selectedItem.value) router.push(`/home/${selectedItem.value.key}`)
    },
    { deep: true }
)
</script>

<style scoped>
@-webkit-keyframes scrollAnimate {
    0% {
        background-position: left bottom;
    }
    50% {
        background-position: top right;
    }
    100% {
        background-position: left bottom;
    }
}

@keyframes scrollAnimate {
    0% {
        background-position: left bottom;
    }
    50% {
        background-position: top right;
    }
    100% {
        background-position: left bottom;
    }
}

.bg-animate {
    background-image: url('/assets/images/ui/bg-animate.jpg');
    background-attachment: fixed;
    -webkit-animation: scrollAnimate 100s linear infinite;
    animation: scrollAnimate 100s linear infinite;
}
</style>
