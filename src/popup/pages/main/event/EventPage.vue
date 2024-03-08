<template>
    <div py-2 border="l-8 red-5" flex="~ col">
        <template v-for="(schedule, index) in schedules">
            <template v-if="index === 0">
                <div pt-2 flex="~ col center" space-y-2>
                    <TagView
                        :title="schedule.currentTimePeriod?.status === 'active' ? t('time.open') : t('time.uncoming')"
                        :bg-color="'bg-event-primary'"
                    />
                    <p text-sm text-event-primary>
                        {{ schedule.currentTimePeriod?.durationTime ?? '' }}
                    </p>
                </div>
                <EventCardView pt-2 v-if="schedule" :now="true" :schedule="schedule" />
            </template>
            <EventCardView pt-6 v-else :now="false" :schedule="schedule" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useEventSchedulesStore } from '@popup/store/schedules'

import EventCardView from './EventCardView.vue'
import TagView from '@popup/components/TagView.vue'

const { t } = useI18n()
const { schedules } = storeToRefs(useEventSchedulesStore())
</script>
