<template>
    <div class="w-full pl-3 pb-3 border-l-8 border-red-500 flex flex-col items-center font-splatoon2">
        <p class="bg-yellow-400 text-xs px-3 mt-6">{{ t('time.now') + '!' }}</p>
        <p class="text-yellow-400 text-xs mt-1">{{ festTime }}</p>
        <p class="text-base text-white pb-2 mt-2">{{ festQuestion }}</p>
        <!-- 三色比赛卡 -->
        <div class="bg-black rounded-lg w-[calc(100%-1.25rem)] mr-3 mt-2 flex flex-col items-center">
            <img class="w-9 h-9 self-end -mt-3 mr-2" src="/images/tricolor.png" />
            <p class="text-yellow-400 text-xs -mt-3" v-t="'splatfest.name'"></p>
            <p class="text-xs text-slate-300 mt-1">{{ t('splatfest.midterm-time', [tricolorBattleTime]) }}</p>
            <img class="rounded-bl-lg rounded-br-lg w-full h-16 mt-3 object-cover" :src="tricolorStage.image.url" />
        </div>
        <p class="text-xs bg-black text-white py-0.5 px-1 -mt-2" v-t="`splatnet.stages.${tricolorStage.id}.name`"></p>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDatas } from '../../utils/datas'

const { t } = useI18n()
const { festTime, festQuestion, tricolorBattleTime, tricolorStage } = useDatas()
</script>
