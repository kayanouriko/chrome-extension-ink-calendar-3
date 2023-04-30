<template>
    <div class="bg-black text-white rounded-lg font-splatoon2 flex flex-col items-center">
        <!-- 信息 -->
        <p class="px-2 pt-2 text-xs text-gray-400">{{ showTime }}</p>
        <p class="px-2 text-sm text-center" v-t="`splatnet.festivals.${record.__splatoon3ink_id}.title`"></p>
        <div class="mt-1 w-full z-10 flex" :class="isResult ? '-mb-3' : 'mb-2'">
            <p class="w-full grow text-shadow text-center font-splatoon1" v-for="team in record.teams" :key="team.id">
                {{ team.result ? (team.result.isWinner ? 'WIN!' : '') : '' }}
            </p>
        </div>
        <img class="bg-gray-700 min-h-[129px]" :src="record.image.url" />
        <div class="flex w-full" :class="isResult ? 'py-1' : 'pt-1 pb-3'">
            <p
                class="w-full grow text-center text-sm"
                v-for="(team, index) in record.teams"
                :key="team.id"
                v-t="`splatnet.festivals.${record.__splatoon3ink_id}.teams[${index}].teamName`"
            ></p>
        </div>
        <!-- 比分 -->
        <template v-if="record.teams[0].result !== null">
            <table class="w-full my-2 text-xs" v-if="isExpend">
                <tr class="bg-slate-900">
                    <th class="w-[34%] text-center"></th>
                    <th class="w-[66%] text-center">
                        <div class="w-full flex">
                            <div
                                class="m-1 grow flex justify-center items-center rounded"
                                v-for="team in record.teams"
                                :key="team.id"
                                :style="`background-color: ${teamColor(team)};`"
                            >
                                <img class="w-6 h-6" :src="team.image.url" />
                            </div>
                        </div>
                    </th>
                </tr>
                <tr v-for="table in tables" :key="table.key">
                    <td class="p-2 bg-slate-800" v-t="table.key"></td>
                    <td class="text-center bg-slate-700">
                        <div class="w-full flex">
                            <div
                                class="grow"
                                :class="boolFromTeam(table.bool, team) ? 'text-[#ECFB58]' : 'text-white'"
                                v-for="team in record.teams"
                            >
                                {{ `${(valueFromTeam(table.value, team) * 100).toFixed(2)}%` }}
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <button class="pb-1" @click="isExpend = !isExpend">
                <img class="w-6 h-6" :src="isExpend ? '/images/btn_up.svg' : '/images/btn_down.svg'" />
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FestRecord, FestTeam } from '../../utils/festDatas'
import { rgbaColor } from '../../utils/tool'
import '../../extension/date.extension'

const { isFirst, record } = defineProps<{
    isFirst: boolean
    record: FestRecord
}>()

const isExpend = ref(isFirst)
const isResult = record.teams[0].result !== null

// 显示数据
const startTime = new Date(record.startTime)
const endTime = new Date(record.endTime)
const showTime =
    startTime.getYearMonthDayTime() +
    ' ' +
    startTime.getHourMinTime() +
    ' - ' +
    endTime.getMonthDayTime() +
    ' ' +
    endTime.getHourMinTime()

const tables = [
    {
        key: 'splatfest.conchshells',
        value: 'horagaiRatio',
        bool: 'isHoragaiRatioTop'
    },
    {
        key: 'splatfest.votes',
        value: 'voteRatio',
        bool: 'isVoteRatioTop'
    },
    {
        key: 'splatfest.open',
        value: 'regularContributionRatio',
        bool: 'isRegularContributionRatioTop'
    },
    {
        key: 'splatfest.pro',
        value: 'challengeContributionRatio',
        bool: 'isChallengeContributionRatioTop'
    },
    {
        key: 'splatfest.tricolor',
        value: 'tricolorContributionRatio',
        bool: 'isTricolorContributionRatioTop'
    }
]

function valueFromTeam(value: string, team: FestTeam) {
    if (team.result === null) {
        return 0
    }
    switch (value) {
        case 'horagaiRatio':
            return team.result.horagaiRatio
        case 'voteRatio':
            return team.result.voteRatio
        case 'regularContributionRatio':
            return team.result.regularContributionRatio
        case 'challengeContributionRatio':
            return team.result.challengeContributionRatio
        case 'tricolorContributionRatio':
            return team.result.tricolorContributionRatio
        default:
            return 0
    }
}

function boolFromTeam(bool: string, team: FestTeam) {
    if (team.result === null) {
        return false
    }
    switch (bool) {
        case 'isHoragaiRatioTop':
            return team.result.isHoragaiRatioTop
        case 'isVoteRatioTop':
            return team.result.isVoteRatioTop
        case 'isRegularContributionRatioTop':
            return team.result.isRegularContributionRatioTop
        case 'isChallengeContributionRatioTop':
            return team.result.isChallengeContributionRatioTop
        case 'isTricolorContributionRatioTop':
            return team.result.isTricolorContributionRatioTop
        default:
            return false
    }
}

function teamColor(team: FestTeam) {
    const color = team.color
    return rgbaColor(color)
}
</script>

<style scoped>
.img-bottom-radius {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
}

th,
td {
    border: 1px solid #000;
}
</style>
