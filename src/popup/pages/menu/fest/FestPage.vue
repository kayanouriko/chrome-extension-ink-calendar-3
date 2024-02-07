<template>
    <BasePage :is-updating="isUpdating" :is-error="isError" @reload="update">
        <div p-3 flex="~ col" space-y-3>
            <p pt-6 self-center text-xl font-splatoon-title>
                {{ t('splatfest.subTitle') + `(${appCurrentRegionCode})` }}
            </p>
            <FestCardView v-for="(festival, index) in festivals" :is-first="index === 0" :festival="festival" />
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useFestivalsStore } from '@popup/store/festivals'
import { useStorageStore } from '@common/chrome/storage'

import BasePage from '@popup/pages/base/BasePage.vue'
import FestCardView from './FestCardView.vue'

const { t } = useI18n()
const { appCurrentRegionCode } = useStorageStore()
const { isUpdating, isError, festivals } = storeToRefs(useFestivalsStore())
const { update } = useFestivalsStore()
// 更新获取数据
update()
</script>
