<template>
    <div class="border-l-8 w-full border-red-500 flex flex-col items-center font-splatoon2 pb-3">
        <p class="text-xs px-3 mt-6" :class="bgColor">
            {{ (isSpSchedule ? t(`salmonrun.${schedule.extType}`) : t('time.now')) + '!' }}
        </p>
        <p class="text-xs mt-1" :class="textColor">{{ time }}</p>
        <img
            class="mt-3 mx-10 w-[calc(100%-5.0rem)] h-28 object-cover rounded-lg"
            :src="schedule.setting.coopStage.thumbnailImage.url"
        />
        <div class="text-sm text-white bg-black py-0.5 px-1 -mt-3 flex items-center space-x-1">
            <img class="w-[20px] h-[20px]" v-if="kingIcon" :src="kingIcon" />
            <p v-t="`splatnet.stages.${schedule.setting.coopStage.id}.name`"></p>
        </div>
        <!-- 武器展示 -->
        <div class="rounded-full bg-slate-600 mt-4 px-4 py-0.5 space-x-3 flex justify-center">
            <img class="w-9 h-9" v-for="weapon in schedule.setting.weapons" :src="weapon.image.url" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CoopSchedule } from '../../utils/datas'
import { useI18n } from 'vue-i18n'
import { useDatas } from '../../utils/datas'

import '../../extension/date.extension'

const { schedule } = defineProps<{
    isSpSchedule: boolean
    schedule: CoopSchedule
}>()

const { t } = useI18n()
const { getCoopKingIcon } = useDatas()

const startTime = new Date(schedule.startTime)
const endTime = new Date(schedule.endTime)
const time =
    startTime.getYearMonthDayTime() +
    ' ' +
    startTime.getHourMinTime() +
    ' - ' +
    endTime.getMonthDayTime() +
    ' ' +
    endTime.getHourMinTime()
const kingIcon = getCoopKingIcon(schedule.__splatoon3ink_king_salmonid_guess)
let bgColor = 'bg-red-500'
let textColor = 'text-red-500'
if (schedule.extType === 'bigrun') {
    bgColor = 'bg-[#B322FF]'
    textColor = 'text-[#B322FF]'
} else if (schedule.extType === 'eggstrawork') {
    bgColor = 'bg-[#D2B42F]'
    textColor = 'text-[#D2B42F]'
}
</script>
