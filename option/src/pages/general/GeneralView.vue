<template>
    <div class="flex w-full px-60">
        <div class="flex flex-col justify-center w-[600px] shrink-0">
            <p class="self-start text-base mt-10 font-semibold" v-t="'option.general.preferred-languages'"></p>
            <div class="rounded shadow p-4 my-4 flex justify-between items-center space-x-4">
                <p class="text-sm" v-t="'option.general.preferred-languages-tip'"></p>
                <select
                    class="bg-gray-100 text-xs w-[200px] p-2 rounded-md outline-yellow-400 appearance-none bg-[url('/images/arrow_down.svg')] bg-no-repeat bg-[calc(100%-8px)] bg-[length:10px_5px]"
                    v-model="state.selectedCode"
                >
                    <option v-for="locale in locales" :value="locale.code">{{ locale.name }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInkI18n, Locale, locales } from '../../../../src/utils/useI18n'
import { getCurrentLocale, setCurrentLocale } from '../../../../src/utils/storage'

const currentLocale = await getCurrentLocale()
const { locale, t } = useI18n()
const state = reactive({ selectedCode: currentLocale.code })

watch(
    () => state.selectedCode,
    selectedCode => {
        // 重新加载国际化
        const selectedLocale = locales.find(l => l.code === selectedCode) as Locale
        locale.value = selectedLocale.code
        setCurrentLocale(selectedLocale)
        // 修改标题
        document.title = t('option.title')
    }
)
</script>
