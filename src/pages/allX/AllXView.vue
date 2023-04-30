<template>
    <div class="h-full pt-6 bg-slate-900 overflow-auto thin-scrollbar flex flex-col items-center font-splatoon2">
        <p class="pb-6 text-xl text-[#52D99D] font-splatoon1">{{ season.name }}</p>
        <div class="-my-3 px-2 py-1 bg-black flex space-x-2 text-xs z-10">
            <p class="text-slate-400">{{ showTime }}</p>
            <p class="text-white" v-t="'xrank.open'"></p>
        </div>
        <div class="grow pt-5 px-2 bg-slate-800 w-full flex flex-col items-center space-y-3">
            <p class="text-xs scale-75 text-slate-300">{{ showUpdateTime }}</p>
            <div class="flex flex-col items-center">
                <img class="h-7" src="/images/xrank_top500_logo.png" />
                <p class="text-white text-lg" v-t="'xrank.topPlayer'"></p>
            </div>
            <div class="w-full rounded-lg overflow-hidden grid grid-cols-2 gap-[1px]">
                <AllXCard v-for="card in cards" :key="card.id" :card="card" @click="cardDidClickModalAction(card)" />
                <Teleport to="body">
                    <template v-if="isModal">
                        <AllXCardDetail :player="currentPlayer!" @close="isModal = false"></AllXCardDetail>
                    </template>
                </Teleport>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AllXCard from './AllXCard.vue'

import { ref } from 'vue'
import { updateXRankDatas, createDatas, TopPlayer } from '../../utils/xrankDatas'
import '../../extension/date.extension'
import AllXCardDetail from './AllXCardDetail.vue'

const season = await updateXRankDatas()
createDatas(season)

const startTime = new Date(season.startTime)
const endTime = new Date(season.endTime)
const showTime = startTime.getYearMonthDayTime() + ' - ' + endTime.getMonthDayTime()
const lastUpdateTime = new Date(season.lastUpdateTime)
const showUpdateTime = lastUpdateTime.getYearMonthDayTime() + ' ' + lastUpdateTime.getHourMinTime()

const cards: TopPlayer[] = [
    {
        ...season.xRankingAr.nodes[0],
        rule: 'AREA'
    },
    {
        ...season.xRankingLf.nodes[0],
        rule: 'LOFT'
    },
    {
        ...season.xRankingGl.nodes[0],
        rule: 'GOAL'
    },
    {
        ...season.xRankingCl.nodes[0],
        rule: 'CLAM'
    }
]

const isModal = ref(false)
let currentPlayer = ref<TopPlayer | null>(null)

function cardDidClickModalAction(card: TopPlayer) {
    currentPlayer.value = card
    isModal.value = true
}
</script>
