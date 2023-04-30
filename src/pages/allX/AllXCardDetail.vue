<template>
    <div
        class="w-[360px] h-[600px] flex justify-center items-center fixed z-50 top-0 left-0 bg-blue-700 bg-opacity-50 font-splatoon2"
    >
        <div class="rounded-lg bg-slate-900 flex flex-col items-center overflow-hidden">
            <div class="pt-2 flex flex-col items-center">
                <img class="h-7" src="/images/xrank_top500_logo.png" />
                <div class="flex items-center space-x-2">
                    <img class="w-5" :src="getRuleIcon(player.rule!)" />
                    <p class="text-white text-base" v-t="`splatnet.rules.${getRuleId(player.rule!)}.name`"></p>
                </div>
            </div>
            <!-- 名片 -->
            <div class="mx-6 my-4 relative w-[280px] h-[80px]">
                <div class="absolute w-full h-full px-2 py-1 flex flex-col">
                    <p class="text-sm" :style="getStyle()">
                        {{ player.byname }}
                    </p>
                    <p class="grow text-xl self-center font-splatoon1" :style="getStyle()">
                        {{ player.name }}
                    </p>
                    <div class="flex justify-between items-center">
                        <p class="text-xs" :style="getStyle()">
                            {{ `#${player.nameId}` }}
                        </p>
                        <div class="flex items-center space-x-1">
                            <img class="w-6" v-for="badge in nameplate.badges" :src="badge.image.url" />
                        </div>
                    </div>
                </div>
                <img :src="nameplate.background.image.url" />
            </div>
            <!-- 排名和武器 -->
            <div class="w-full py-4 bg-slate-800 flex justify-center items-center space-x-4">
                <!-- 武器 -->
                <div class="flex items-center space-x-1">
                    <img class="w-16 h-16" :src="weapon.image.url" />
                    <div class="flex flex-col space-y-1">
                        <img class="p-1 w-7 h-7 bg-black rounded" :src="weapon.subWeapon.image.url" />
                        <img class="p-1 w-7 h-7 bg-black rounded" :src="weapon.specialWeapon.image.url" />
                    </div>
                </div>
                <!-- 排名 -->
                <div class="flex flex-col space-y-2">
                    <p class="text-yellow-400 text-sm" v-t="'xrank.topWeapon'"></p>
                    <p class="px-2 py-1 text-xs bg-[#52D99D] rounded-full">
                        {{ `${t('xrank.xpower')}: ${player.xPower}` }}
                    </p>
                </div>
            </div>
            <button class="bg-slate-700 text-white w-full h-10" @click="$emit('close')">
                <p v-t="'normal.close'"></p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TopPlayer } from '../../utils/xrankDatas'
import { rgbaColor, getRuleId, getRuleIcon } from '../../utils/tool'
import { useI18n } from 'vue-i18n'

const { player } = defineProps<{
    player: TopPlayer
}>()

defineEmits<{
    (event: 'close'): void
}>()

const { t } = useI18n()
const nameplate = player.nameplate
const weapon = player.weapon

function getStyle() {
    return `color: ${rgbaColor(nameplate.background.textColor)};`
}
</script>
