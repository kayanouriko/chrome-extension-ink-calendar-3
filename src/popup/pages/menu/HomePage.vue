<template>
    <div p-6 flex justify-center items-start>
        <button
            v-for="item in items"
            :key="item.key"
            w-24
            flex="~ col"
            justify-center
            items-center
            space-y-2
            hover:scale-105
            @click="clickAction(item)"
        >
            <img square-12 rounded-xl :src="item.icon" :alt="t(item.name)" />
            <p>{{ t(item.name) }}</p>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { settingItems, SettingItem } from './utils'

const router = useRouter()
const { t } = useI18n()
const items = settingItems.filter(i => i.key !== 'home')

function clickAction(item: SettingItem) {
    if (item.key === 'option') {
        chrome.runtime.openOptionsPage()
        return
    }
    router.push(`/menu/${item.key}`)
}
</script>
