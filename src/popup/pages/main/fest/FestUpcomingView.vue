<template>
    <div px-2 flex="~ col center">
        <p mt-2 text-center font-splatoon-title>
            {{ t(`splatnet.festivals.${festivalRecord.__splatoon3ink_id}.title`, festivalRecord.title) }}
        </p>
        <div mt-4 class="w-[calc(100%-1rem)]" flex>
            <div
                v-for="(team, index) in festivalRecord.teams"
                :class="index === 0 ? 'rounded-tl-lg rounded-bl-lg' : index === 2 ? 'rounded-tr-lg rounded-br-lg' : ''"
                :style="`background-color: ${team.color};`"
            >
                <img
                    p="t-3 b-5"
                    :src="team.image"
                    :alt="
                        t(
                            `splatnet.festivals.${festivalRecord.__splatoon3ink_id}.teams[${index}].teamName`,
                            team.teamName
                        )
                    "
                />
            </div>
        </div>
        <div class="w-[calc(100%-1rem)] -mt-2" flex>
            <div v-for="(team, index) in festivalRecord.teams" w-0 grow flex justify-center items-center>
                <p mx-2 text-center px-1 py-0.5 text-xs bg-black>
                    {{
                        t(
                            `splatnet.festivals.${festivalRecord.__splatoon3ink_id}.teams[${index}].teamName`,
                            team.teamName
                        )
                    }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { FestivalRecord } from '@popup/store/festivals'

const { festivalRecord } = defineProps<{
    festivalRecord: FestivalRecord
}>()

const { t } = useI18n()
</script>
