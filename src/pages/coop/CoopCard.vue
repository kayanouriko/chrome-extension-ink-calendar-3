<template>
    <div class="border-l-8 border-red-500 pb-3">
        <!-- 时间部分 -->
        <div class="flex items-center">
            <div class="bg-yellow-400 w-5 h-1 -ml-2 -mr-1"></div>
            <div class="font-splatoon1 bg-yellow-400 px-2 my-2 text-xs rounded-full">{{ time }}</div>
        </div>
        <!-- 特殊模式的标识 -->
        <div v-if="schedule.extType" class="mx-3 flex items-center space-x-1">
            <img class="w-5 h-5" :src="getCoopSpIcon(schedule.extType)" />
            <p class="text-white font-splatoon2 text-base" v-t="`salmonrun.${schedule.extType}`"></p>
        </div>
        <!-- 地图和武器 -->
        <div class="flex items-center mx-3 mt-2 space-x-3">
            <div class="flex flex-col items-center w-3/5">
                <img class="rounded-lg w-full h-14 object-cover" :src="schedule.setting.coopStage.thumbnailImage.url" />
                <div class="text-xs text-white bg-black py-0.5 px-1 -mt-2 flex items-center space-x-1">
                    <img class="w-[16px] h-[16px]" v-if="kingIcon" :src="kingIcon" />
                    <p class="font-splatoon2" v-t="`splatnet.stages.${schedule.setting.coopStage.id}.name`"></p>
                </div>
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
import { useDatas } from '../../utils/datas'

import '../../extension/date.extension'

const { schedule } = defineProps<{
    schedule: CoopSchedule
}>()

const { getCoopKingIcon, getCoopSpIcon } = useDatas()
const startTime = new Date(schedule.startTime)
let time = startTime.getMonthDayTime() + ' ' + startTime.getHourMinTime()
const kingIcon = getCoopKingIcon(schedule.__splatoon3ink_king_salmonid_guess)
</script>
