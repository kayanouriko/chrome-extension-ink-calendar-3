<template>
    <div pt-2 flex="~ col" items-center>
        <p :class="timetable && timetable.length > 0 ? 'pb-2' : ''" px-2>{{ t('splatfest.name') }}</p>
        <p
            v-if="timetable === undefined || timetable === null || timetable.length === 0"
            :class="stages.length === 2 ? '' : 'pb-2'"
            px-2
            text-sm
        >
            {{ t('splatfest.midterm-time', [midtermTime]) }}
        </p>
        <template v-if="stages.length === 2">
            <!-- 两张地图随机 -->
            <CardMapView :vs-stages="stages" />
        </template>
        <template v-else-if="stages[0]">
            <!-- 一张固定地图或者日程轮换地图 -->
            <img class="w-[calc(100%-3.5rem)]" h-5.125rem object-cover rounded-lg :src="stages[0].image" alt="" />
            <p class="-mt-2" px-1 py-0.5 text-xs bg-black>
                {{ t(`splatnet.stages.${stages[0].id}.name`, stages[0].name) }}
            </p>
        </template>
        <button
            v-if="timetable && timetable.length > 0"
            mt-2
            px-4
            py-1
            bg-white
            bg-op-30
            rounded-full
            text-xs
            @click="showModal = true"
        >
            {{ t('splatfest.timetable') }}
        </button>
        <Teleport to="body">
            <FestTimetableDialog
                :show="showModal"
                :timetable="timetable"
                @close="showModal = false"
            ></FestTimetableDialog>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Timetable } from '@popup/store/schedules'
import { ref } from 'vue'

import FestTimetableDialog from './FestTimetableDialog.vue'
import CardMapView from '@/popup/components/card/CardMapView.vue'

defineProps<{
    midtermTime: string
    stages: {
        name: string
        image: string
        id: string
    }[]
    timetable: Timetable
}>()

const { t } = useI18n()

const showModal = ref(false)
</script>
