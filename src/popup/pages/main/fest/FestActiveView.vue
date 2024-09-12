<template>
    <div pt-2 flex="~ col" items-center>
        <p :class="timetable && timetable.length > 0 ? 'pb-2' : ''" px-2>{{ t('splatfest.name') }}</p>
        <p v-if="timetable === undefined || timetable.length === 0" px-2 pb-2 text-sm>
            {{ t('splatfest.midterm-time', [midtermTime]) }}
        </p>
        <img v-if="stage" class="w-[calc(100%-3.5rem)]" h-5.125rem object-cover rounded-lg :src="stage.image" alt="" />
        <p v-if="stage" class="-mt-2" px-1 py-0.5 text-xs bg-black>
            {{ t(`splatnet.stages.${stage.id}.name`, stage.name) }}
        </p>
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
import { TricolorStage, Timetable } from '@popup/store/schedules'
import { ref } from 'vue'

import FestTimetableDialog from './FestTimetableDialog.vue'

defineProps<{
    midtermTime: string
    stage?: TricolorStage
    timetable?: Timetable
}>()

const { t } = useI18n()

const showModal = ref(false)
</script>
