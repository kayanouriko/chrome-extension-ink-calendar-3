<template>
    <div flex="~ col" items-start>
        <!-- 模式 -->
        <div px-2 flex items-center space-x-2>
            <img w-6 h-6 :src="icon" alt="rule logo" />
            <p>{{ t(`splatnet.rules.${ruleId}.name`, ruleName) }}</p>
        </div>
        <!-- 标题 -->
        <p px-2 pt-2 text-event-primary font-splatoon-title v-html="t(`splatnet.events.${id}.name`, name)" />
        <!-- 副标题 -->
        <p px-2 text-sm break-words v-html="t(`splatnet.events.${id}.desc`, desc)" />
        <!-- 地图 -->
        <CardMapView my-2 :vs-stages="stages" />
        <!-- 规则 -->
        <p
            mx-2
            mb-4
            p-2
            self-stretch
            bg-white
            bg-op-30
            rounded-lg
            text-sm
            v-html="
                t(`splatnet.events.${id}.regulation`, regulation).replace(
                    `${t(`splatnet.events.${id}.desc`, desc)}<br /><br />`,
                    ''
                )
            "
        />
        <template v-if="timePeriods.length > 0">
            <TagView v-if="now" m="x-2 b-2" bg-color="bg-event-primary" />
            <!-- 时间 -->
            <EventCardTimeView v-for="timePeriod in timePeriods" :time-period="timePeriod.showTime" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { EventSchedule } from '@/popup/store/schedules'

import CardMapView from '@/popup/components/card/CardMapView.vue'
import TagView from '@/popup/components/TagView.vue'
import EventCardTimeView from './EventCardTimeView.vue'

const { now, schedule } = defineProps<{
    now: boolean
    schedule: EventSchedule
}>()

const {
    leagueMatchSetting: {
        leagueMatchEvent: { id, name, desc, regulation },
        vsStages: stages,
        vsRule: { icon, id: ruleId, name: ruleName }
    }
} = schedule
let { timePeriods } = schedule

if (now) {
    timePeriods = schedule.nextTimePeriods
}

const { t } = useI18n()
</script>
