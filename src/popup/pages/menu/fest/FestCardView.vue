<template>
    <div bg-black rounded-lg flex="~ col" text-center>
        <!-- 基本信息 -->
        <p p="x-2 t-2" text-xs text-gray-400>{{ durationTime }}</p>
        <p px-2 text-sm>{{ t(`splatnet.festivals.${id}.title`, title) }}</p>
        <div :class="hasResult ? '-mb-2' : 'mb-2'" mt-1 flex z-10>
            <p v-for="team in teams" :key="team.id" w-0 grow font-splatoon-title text-shadow-xl text-sm>
                {{ team.result ? (team.result.isWinner ? 'WIN!' : '') : '' }}
            </p>
        </div>
        <img bg-gray-700 :src="image" />
        <div :class="hasResult ? 'py-1' : 'pt-1 pb-3'" flex>
            <p v-for="(team, index) in teams" :key="team.id" w-0 grow text-sm break-all>
                {{ t(`splatnet.festivals.${id}.teams[${index}].teamName`, team.teamName) }}
            </p>
        </div>
        <!-- 比分模板 -->
        <template v-if="hasResult">
            <table v-show="isExpend" my-2 text-xs>
                <tr bg-slate-900>
                    <th class="w-34%" border="~ slate-900"></th>
                    <th class="w-66%" border="~ slate-900">
                        <div w-full flex>
                            <div
                                v-for="(team, index) in teams"
                                :key="team.id"
                                :style="`background-color: ${team.color};`"
                                m-1
                                grow
                                flex
                                justify-center
                                items-center
                                rounded
                            >
                                <img
                                    square-6
                                    :src="team.image"
                                    :alt="t(`splatnet.festivals.${id}.teams[${index}].teamName`, team.teamName)"
                                />
                            </div>
                        </div>
                    </th>
                </tr>
                <tr v-for="table in tables" :key="table.key">
                    <td p-2 bg-slate-800 text-left border="~ slate-900">{{ t(table.key) }}</td>
                    <td bg-slate-700 border="~ slate-900">
                        <div w-full flex>
                            <p
                                v-for="team in teams"
                                :class="boolFromTeam(table.bool, team) ? 'text-[#ECFB58]' : 'text-white'"
                                w-0
                                grow
                            >
                                {{ `${((valueFromTeam(table.value, team) ?? 0) * 100).toFixed(2)}%` }}
                            </p>
                        </div>
                    </td>
                </tr>
            </table>
            <button self-center pb-1 @click="isExpend = !isExpend">
                <img
                    square-6
                    :src="isExpend ? '/assets/images/menu/btn-up.svg' : '/assets/images/menu/btn-down.svg'"
                    alt=""
                />
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FestivalRecord, FestivalTeam } from '@popup/store/festivals'

const { isFirst, festival } = defineProps<{
    isFirst: boolean
    festival: FestivalRecord
}>()

const { t } = useI18n()

console.log(festival)

const isExpend = ref(isFirst)
const { durationTime, __splatoon3ink_id: id, title, image, teams } = festival
const hasResult = teams[0] && teams[0].result

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

function valueFromTeam(value: string, team: FestivalTeam) {
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

function boolFromTeam(bool: string, team: FestivalTeam) {
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
</script>
