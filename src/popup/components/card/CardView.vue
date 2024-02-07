<template>
    <CardTimeView :should-show-year-time="shouldShowYearTime" :schedule="schedule" />
    <template v-for="match in schedule.matches">
        <CardInfoView :vs-rule="match.vsRule" :mode="match.mode" :mode-name="match.modeName" />
        <CardMapView :vs-stages="match.vsStages" />
    </template>
</template>

<script setup lang="ts">
import { Schedule } from '@popup/store/schedules'

import CardTimeView from './CardTimeView.vue'
import CardInfoView from './CardInfoView.vue'
import CardMapView from './CardMapView.vue'

defineProps<{
    shouldShowYearTime: boolean
    schedule: Schedule
}>()
</script>
