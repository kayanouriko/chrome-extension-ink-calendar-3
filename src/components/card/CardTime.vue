<template>
    <p v-show="shouldShowTime" class="ml-2 pt-2 font-splatoon1 text-yellow-400 text-base">{{ showTime }}</p>
    <div class="flex items-center">
        <div class="bg-yellow-400 w-5 h-1 -ml-2 -mr-1"></div>
        <div class="font-splatoon1 bg-yellow-400 px-2 my-3 text-xs rounded-full">{{ getTime(time) }}</div>
    </div>
</template>

<script setup lang="ts">
import { useDatas } from '../../utils/datas'

const { time, isFirst } = defineProps<{
    isFirst: boolean
    time: string
}>()

const { getTime, isSameDay } = useDatas()
const { shouldShowTime, showTime } = isSameDay(time, isFirst)
let alarmable = false
if (isFirst) {
    // index === 0 的时候
    if (shouldShowTime) {
        // 说明该时间可以预约
        alarmable = true
    }
} else {
    // 其余的都可以预约
    alarmable = true
}
</script>
