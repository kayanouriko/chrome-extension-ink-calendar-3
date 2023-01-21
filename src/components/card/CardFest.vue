<template>
    <div class="w-full pl-3 pb-3 border-l-8 border-red-500 flex flex-col items-center font-splatoon2">
        <p class="bg-yellow-400 text-xs px-3 mt-6">{{ t('time.now') + '!' }}</p>
        <p class="text-yellow-400 text-xs mt-1">{{ getFestTime() }}</p>
        <p class="text-base text-white pb-2 mt-2">{{ getFestQuestion() }}</p>
        <!-- 三色比赛卡 -->
        <div class="bg-black rounded-lg w-[calc(100%-1.25rem)] mr-3 mt-2 flex flex-col items-center">
            <img class="w-9 h-9 self-end -mt-3 mr-2" src="/images/tricolor.png" />
            <p class="text-yellow-400 text-xs -mt-3" v-t="'splatfest.name'"></p>
            <p class="text-xs text-slate-300 mt-1">{{ t('splatfest.midterm-time', [getTricolorBattleTime()]) }}</p>
            <img class="rounded-bl-lg rounded-br-lg w-full h-16 mt-3 object-cover" :src="tricolorStage.image.url" />
        </div>
        <p class="text-xs bg-black text-white py-0.5 px-1 -mt-2">{{ tricolorStage.name }}</p>
        <!-- TODO: 添加历代祭典信息的入口 -->
        <div class="px-3 py-1 mt-5 text-xs text-white rounded-full bg-slate-600">
            {{ t('splatfest.all') }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useData } from '../../utils/datas'

const { t } = useI18n()
const { getFestTime, getFestQuestion, getTricolorBattleTime, getTricolorStage } = useData()
const tricolorStage = getTricolorStage()
</script>
