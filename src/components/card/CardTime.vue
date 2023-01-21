<template>
    <p v-show="shouldShowTime" class="ml-2 pt-2 font-splatoon1 text-yellow-400 text-base">{{ showTime }}</p>
    <div class="flex items-center">
        <div class="bg-yellow-400 w-5 h-1 -ml-2 -mr-1"></div>
        <div class="font-splatoon1 bg-yellow-400 px-2 my-3 text-xs rounded-full">{{ getTime(time) }}</div>
    </div>
</template>

<script setup lang="ts">
import { useData } from '../../utils/datas'

const { time } = defineProps<{
    time: string
}>()

const { getTime, isSameDay } = useData()
const { shouldShowTime, showTime } = isSameDay(time)
</script>
