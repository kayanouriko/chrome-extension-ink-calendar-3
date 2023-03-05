<template>
    <div>
        <img v-if="isBigRun" :src="bigRunBannerImage" />
        <CoopCardNow :schedule="isBigRun ? bigRunSchedule : coopSchedules[0]" :is-big-run="isBigRun"></CoopCardNow>
        <template v-for="(schedule, index) in coopSchedules">
            <CoopCard v-if="index != 0" :schedule="schedule" :is-big-run="isBigRun"></CoopCard>
        </template>
    </div>
</template>

<script setup lang="ts">
import CoopCardNow from './CoopCardNow.vue'
import CoopCard from './CoopCard.vue'

import { useDatas } from '../../utils/datas'

const { isBigRun, bigRunBannerImage, bigRunSchedule, coopSchedules } = useDatas()
</script>
