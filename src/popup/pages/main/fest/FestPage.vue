<template>
    <div v-if="currentFestRecord" border="l-8 red-5" flex="~ col">
        <div pt-4 flex="~ col" items-center>
            <TagView :title="t(currentFestRecord.stateText)" :bg-color="'bg-fest-primary'" />
            <p v-if="currentFestRecord.state !== 'RESULT'" mt-2 text-sm text-fest-primary>
                {{ currentFestRecord.durationTime ?? '' }}
            </p>
        </div>
        <FestUpcomingView v-if="currentFestRecord.state === 'SCHEDULED'" :festivalRecord="currentFestRecord" />
        <FestCardView
            m-3
            v-else-if="currentFestRecord.state === 'RESULT'"
            :is-first="true"
            :festival="currentFestRecord"
        ></FestCardView>
        <FestActiveView
            v-else-if="currentFest && (currentFest.state === 'FIRST_HALF' || currentFest.state === 'SECOND_HALF')"
            :midterm-time="currentFest.midtermTime"
            :stage="currentFest.currentTricolorStage"
            :timetable="currentFest.timetable"
        />
        <CardView
            v-for="(schedule, index) in schedules"
            :key="schedule.startTime"
            :should-show-year-time="currentFest?.state === 'SCHEDULED' && index === 0"
            :schedule="schedule"
        />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useFestSchedulesStore } from '@popup/store/schedules'

import TagView from '@/popup/components/TagView.vue'
import FestActiveView from './FestActiveView.vue'
import FestUpcomingView from './FestUpcomingView.vue'
import CardView from '@popup/components/card/CardView.vue'
import FestCardView from '@popup/pages/menu/fest/FestCardView.vue'

const { t } = useI18n()
const { currentFest, currentFestRecord, schedules } = storeToRefs(useFestSchedulesStore())
</script>
