<template>
    <div class="bg-slate-700 flex flex-col font-splatoon2 text-white text-base cursor-pointer hover:bg-slate-600">
        <div class="px-2 py-3 flex items-start space-x-2">
            <img class="w-8" :src="ruleIcon" />
            <div class="flex flex-col space-y-1">
                <p class="text-xs text-slate-400 text-shadow" v-t="`splatnet.rules.${ruleId}.name`"></p>
                <p>{{ card.name }}</p>
                <div class="pl-2 pr-3 py-1 flex items-center space-x-2 bg-black rounded-full">
                    <img class="w-6" :src="card.weapon.image.url" />
                    <p class="text-xs">{{ card.xPower }}</p>
                </div>
            </div>
        </div>
        <!-- 暂时关闭 -->
        <!-- <button class="bg-slate-900 w-full">
            <p class="py-2 text-slate-400 text-xs scale-95">ranking</p>
        </button> -->
    </div>
</template>

<script setup lang="ts">
import { TopPlayer } from '../../utils/xrankDatas'
import { getRuleIcon, getRuleId } from '../../utils/tool'

const { card } = defineProps<{
    card: TopPlayer
}>()

const ruleIcon = getRuleIcon(card.rule ?? 'AREA')
const ruleId = getRuleId(card.rule ?? 'AREA')
</script>
