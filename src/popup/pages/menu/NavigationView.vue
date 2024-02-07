<template>
    <div px-2 h-3rem bg-black flex justify-between items-center>
        <button @click="router.back()">
            <img
                square-7
                :src="
                    selectedItem.key === 'home' ? '/assets/images/ui/btn-close.webp' : '/assets/images/ui/btn-prev.png'
                "
                alt="close"
            />
        </button>
        <div flex items-center>
            <img p-2 square-12 :src="selectedItem.icon" :alt="t(selectedItem.name)" />
            <p pr-2 text-xl font-splatoon-title v-t="selectedItem.name" />
        </div>
        <div square-7 />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { settingItems, SettingItem } from './utils'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const selectedItem = ref<SettingItem>(settingItems.find(i => i.key === 'home')!)

watch(
    () => route.name,
    newValue => {
        // 监听路由变化, 更新 navigation title
        selectedItem.value = settingItems.find(i => i.key === newValue)!
    }
)
</script>
