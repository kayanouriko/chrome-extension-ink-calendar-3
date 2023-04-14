<template>
    <div>
        <img v-if="isSpSchedule" :src="bigRunBannerImage" />
        <CoopCardNow :schedule="showSchedule" :is-sp-schedule="isSpSchedule"></CoopCardNow>
        <template v-for="(schedule, index) in coopSchedules">
            <CoopCard v-if="index != 0" :schedule="schedule"></CoopCard>
        </template>
    </div>
</template>

<script setup lang="ts">
import CoopCardNow from './CoopCardNow.vue'
import CoopCard from './CoopCard.vue'

import { useDatas } from '../../utils/datas'

const { bigRunBannerImage, coopSchedules } = useDatas()
// 通过里面排查, 大型跑和打工竞赛永远排在普通打工的前面
const showSchedule = coopSchedules[0]
const isSpSchedule = showSchedule.extType !== undefined
</script>
