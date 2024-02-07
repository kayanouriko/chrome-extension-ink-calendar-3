<template>
    <div v-if="currentFest" border="l-8 red-5" flex="~ col">
        <div pt-4 flex="~ col" items-center>
            <TagView mt-2 :title="t(currentFest.stateText)" :bg-color="'bg-fest-primary'" />
            <p mt-2 text-sm text-fest-primary>
                {{ currentFest.durationTime ?? '' }}
            </p>
        </div>
        <FestUpcomingView
            v-if="currentFest.state === 'SCHEDULED' && currentFestRecord"
            :festivalRecord="currentFestRecord"
        />
        <FestActiveView
            v-else-if="currentFest.state === 'FIRST_HALF' || currentFest.state === 'SECOND_HALF'"
            :midterm-time="currentFest.midtermTime"
            :stage="currentFest.tricolorStage"
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

const { t } = useI18n()
const { currentFest, currentFestRecord, schedules } = storeToRefs(useFestSchedulesStore())
</script>
