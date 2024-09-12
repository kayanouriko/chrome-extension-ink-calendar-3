<template>
    <div class="w-22.5rem h-37.5rem" text-white text-base font-splatoon-content>
        <BasePage :is-updating="isUpdating" :error-msg="errorMsg" @reload="startUpdate">
            <RouterView v-slot="{ Component }">
                <KeepAlive include="HomePage">
                    <component :is="Component" />
                </KeepAlive>
            </RouterView>
        </BasePage>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useHomeStore } from '@popup/store/home'
import { changeSplatfont } from '@common/i18n'
import { useStorageStore } from '@common/chrome/storage'
import { useI18nDataStore } from '@popup/store/download'

import BasePage from '@popup/pages/base/BasePage.vue'

const { startUpdate } = useHomeStore()
const { isUpdating, errorMsg } = storeToRefs(useHomeStore())
const { data } = storeToRefs(useI18nDataStore())
const { locale, setLocaleMessage, getLocaleMessage } = useI18n()

// 开始获取数据
startUpdate()
// 开始监听国际化相关的变化
// useI18n 的组合式 api 必须在 setup root 下使用, 所以这里的逻辑没有封装, 看上去确实相当恶心
// 开始更新国际化文本
watch(data, async newValue => {
    // 如果获取到数据为 undefined, 则不更新
    if (newValue === undefined) return
    // 这时候已经获取到 data
    const code = useStorageStore().appCurrentLanguageCode
    // 如果语言与 AppCode 不一致, 则切换为 AppCode
    if (locale.value !== code) locale.value = code
    // 同时更新 font
    changeSplatfont(code)
    // 更新获取到的额外数据, 并放置到 splatnet 字段下面
    setLocaleMessage(code, {
        ...getLocaleMessage(code),
        splatnet: newValue
    })
})
</script>
