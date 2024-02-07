<template>
    <p v-if="shouldShowYearTime || isEarlyHour" ml-2 pt-2 font-splatoon-title text-yellow-4>
        {{ yearShowTime }}
    </p>
    <div flex items-center>
        <div class="-mr-1" w-3 h-1 bg-yellow-4 />
        <p px-2 my-2 text-xs text-black rounded-full bg-yellow-4 font-splatoon-title>
            {{ showTime }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { Schedule } from '@popup/store/schedules'

const { schedule } = defineProps<{
    shouldShowYearTime: boolean
    schedule: Schedule
}>()

const { isEarlyHour, yearShowTime, showTime } = schedule
</script>
