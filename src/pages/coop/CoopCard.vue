<template>
    <div class="border-l-8 border-red-500 pb-3">
        <!-- 时间部分 -->
        <div class="flex items-center">
            <div class="bg-yellow-400 w-5 h-1 -ml-2 -mr-1"></div>
            <div class="font-splatoon1 bg-yellow-400 px-2 my-2 text-xs rounded-full">{{ time }}</div>
        </div>
        <!-- 地图和武器 -->
        <div class="flex items-center mx-3 mt-1 space-x-3">
            <div class="flex flex-col items-center w-3/5">
                <img class="rounded-lg w-full h-14 object-cover" :src="schedule.setting.coopStage.thumbnailImage.url" />
                <p
                    class="font-splatoon2 text-xs bg-black text-white py-0.5 px-1 -mt-3"
                    v-t="`splatnet.stages.${schedule.setting.coopStage.id}.name`"
                ></p>
            </div>
            <div class="flex flex-col space-y-2">
                <p class="text-xs text-white font-splatoon2" v-t="'salmonrun.weapons'"></p>
                <div class="flex items-center space-x-1">
                    <img class="w-6 h-6" v-for="weapon in schedule.setting.weapons" :src="weapon.image.url" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CoopSchedule } from '../../utils/datas'
import '../../extension/date.extension'

const { schedule } = defineProps<{
    schedule: CoopSchedule
}>()

const startTime = new Date(schedule.startTime)
const time = startTime.getMonthDayTime() + ' ' + startTime.getHourMinTime()
</script>
