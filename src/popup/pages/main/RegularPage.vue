<template>
    <div pt-2 border="l-8 red-5">
        <template v-if="currentFest?.state === 'FIRST_HALF' || currentFest?.state === 'SECOND_HALF'">
            <p pt-4 text-center text-fest-primary>{{ t('schedule.festtime') }}</p>
        </template>
        <CardView
            v-for="(schedule, index) in schedules"
            :should-show-year-time="
                (currentFest?.state === 'FIRST_HALF' || currentFest?.state === 'SECOND_HALF') && index === 0
            "
            :schedule="schedule"
            :key="schedule.startTime"
        />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useRegularSchedulesStore, useFestSchedulesStore } from '@popup/store/schedules'

import CardView from '@popup/components/card/CardView.vue'

const { t } = useI18n()
const { schedules } = storeToRefs(useRegularSchedulesStore())
const { currentFest } = storeToRefs(useFestSchedulesStore())
</script>
