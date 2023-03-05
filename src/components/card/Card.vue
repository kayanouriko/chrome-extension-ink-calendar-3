<template>
    <div class="border-l-8 border-red-500">
        <CardTime :time="schedule.startTime" :is-first="isFirst"></CardTime>
        <div v-for="match in matches">
            <CardInfo :rule="(match.vsRule as Rule)" :mode="match.mode"></CardInfo>
            <CardMap :stages="(match.vsStages as Stage[])"></CardMap>
        </div>
    </div>
</template>

<script setup lang="ts">
import CardTime from './CardTime.vue'
import CardInfo from './CardInfo.vue'
import CardMap from './CardMap.vue'

import { BattleType, Match, Rule, Schedule, Stage } from '../../utils/datas'

const { battleType, schedule } = defineProps<{
    isFirst: boolean
    battleType: BattleType
    schedule: Schedule
}>()

let matches: Match[]
switch (battleType) {
    case BattleType.Splatfest:
        matches = [schedule.festMatchSetting as Match]
        break
    case BattleType.Regular:
        matches = [schedule.regularMatchSetting as Match]
        break
    case BattleType.Bankara:
        matches = schedule.bankaraMatchSettings as Match[]
        break
    case BattleType.X:
        matches = [schedule.xMatchSetting as Match]
        break
}
</script>
