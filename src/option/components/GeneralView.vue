<template>
    <div px-4 py-2 bg-white bg-op-10 rounded flex="~ col" space-y-2>
        <!-- 标题 -->
        <p text-2xl v-t="'option.title'"></p>
        <!-- 语言代码 -->
        <div py-2 flex items-start space-x-2>
            <div grow flex="~ col" space-y-1>
                <p text-xl v-t="'option.general.preferred-languages'"></p>
                <p text-sm v-t="'option.general.preferred-languages-tip'"></p>
            </div>
            <select
                class="bg-black text-xs font-sans w-50 shrink-0 p-2 rounded-md outline-gray-500 appearance-none"
                v-model="state.languageCode"
            >
                <option v-for="locale in appSupportedLocales" :value="locale.code">{{ locale.name }}</option>
            </select>
        </div>
        <!-- 区域代码 -->
        <div py-2 flex items-start space-x-2>
            <div grow flex="~ col" space-y-1>
                <p text-xl v-t="'option.general.region-codes'"></p>
                <p text-sm v-html="t('option.general.region-codes-tip')"></p>
            </div>
            <select
                class="bg-black text-xs font-sans w-50 shrink-0 p-2 rounded-md outline-gray-500 appearance-none"
                v-model="state.regionCode"
            >
                <option v-for="region in appSupportedRegions" :value="region">{{ region }}</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useStorageStore } from '@common/chrome/storage'
import { useI18n } from 'vue-i18n'
import { appSupportedLocales, changeSplatfont } from '@common/i18n'
import { appSupportedRegions } from '@popup/store/festivals'

const { t, locale } = useI18n()
const { update, setAppCurrentLanguageCode, setAppCurrentRegionCode, removeStorageLocale } = useStorageStore()
const { appCurrentLanguageCode, appCurrentRegionCode } = storeToRefs(useStorageStore())

const state = reactive({
    languageCode: appSupportedLocales[0].code,
    regionCode: appSupportedRegions[0]
})

// 监听缓存读取部分
watch(appCurrentLanguageCode, newValue => {
    if (newValue) state.languageCode = newValue
})

watch(appCurrentRegionCode, newValue => {
    if (newValue) state.regionCode = newValue
})

watch(
    () => state.languageCode,
    newValue => {
        changeLocale(newValue)
        // 保存数据到缓存
        if (import.meta.env.PROD) {
            setAppCurrentLanguageCode(newValue)
            // 并将额外的语言 data 删除
            removeStorageLocale()
        }
    }
)

watch(
    () => state.regionCode,
    newValue => {
        if (import.meta.env.PROD) {
            // 保存数据到缓存
            setAppCurrentRegionCode(newValue)
        }
    }
)
// 更新逻辑放在 watch 之后
update()

function changeLocale(code: string) {
    if (locale.value !== code) locale.value = code
    changeSplatfont(code)
}
</script>
