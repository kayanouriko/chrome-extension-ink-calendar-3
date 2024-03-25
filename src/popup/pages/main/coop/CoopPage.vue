<template>
    <div border="l-8 red-5" flex="~ col" space-y-2>
        <template v-if="bannerImage && spSchedule">
            <img class="-mt-2" w-full h-44 bg-white bg-op-30 :src="bannerImage" alt="banner" />
            <CoopCardNowView :schedule="spSchedule" />
            <CoopCardView v-for="schedule in regularSchedules" :schedule="schedule" />
        </template>
        <template v-else v-for="(schedule, index) in schedules">
            <CoopCardNowView v-if="index === 0" :schedule="schedule" />
            <CoopCardView v-else :schedule="schedule" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCoopSchedulesStore } from '@popup/store/schedules'

import CoopCardView from './CoopCardView.vue'
import CoopCardNowView from './CoopCardNowView.vue'
// 大型跑和团本打工的时间不一定和普通打工的开始结束时间对得上, 所以用 bannerImage 和 spSchedule 来判断
// 内部已经处理了能获取到 spSchedule 的开始时间
const { bannerImage, spSchedule, regularSchedules, schedules } = storeToRefs(useCoopSchedulesStore())
</script>
