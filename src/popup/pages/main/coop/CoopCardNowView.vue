<template>
    <div pt-4 flex="~ col center">
        <TagView
            self-center
            :title="schedule.mode ? t(schedule.mode) : t('time.now')"
            :bg-color="getBgColor(schedule.mode)"
        />
        <p :class="getColor(schedule.mode)" mt-2 self-center text-sm>
            {{ schedule.durationTime }}
        </p>
        <p mt-2>{{ t(`splatnet.stages.${stageId}.name`, stageName) }}</p>
        <img
            class="w-[calc(100%-3.5rem)]"
            mt-2
            self-center
            h-5.125rem
            object-cover
            rounded-lg
            :src="stageUrl"
            :alt="t(`splatnet.stages.${stageId}.name`, stageName)"
        />

        <div v-if="boss" class="-mt-3" px-2 py-0.5 bg-black flex items-center space-x-1>
            <img w-5 h-5 :src="boss.icon" :alt="t(`splatnet.bosses.${boss.id}.name`, boss.name)" />
            <p text-sm>{{ t(`splatnet.bosses.${boss.id}.name`, boss.name) }}</p>
        </div>
        <div mt-4 mb-2 px-4 py-0.5 bg-white bg-op-30 rounded-full flex items-center space-x-3>
            <img
                class="w-10 h-10"
                v-for="weapon in weapons"
                :src="weapon.image"
                :alt="t(`splatnet.weapons.${weapon.__splatoon3ink_id}.name`, weapon.name)"
                :title="t(`splatnet.weapons.${weapon.__splatoon3ink_id}.name`, weapon.name)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CoopSchedule } from '@popup/store/schedules'

import TagView from '@popup/components/TagView.vue'

const { schedule } = defineProps<{
    schedule: CoopSchedule
}>()

const { t } = useI18n()

const {
    setting: {
        boss,
        coopStage: { name: stageName, thumbnailImage: stageUrl, id: stageId },
        weapons
    }
} = schedule

function getBgColor(mode?: string) {
    switch (mode) {
        case 'salmonrun.bigrun':
            return 'bg-bigrun-primary'
        case 'salmonrun.eggstrawork':
            return 'bg-eggstra-primary'
        default:
            return 'bg-salmonrun-primary'
    }
}

function getColor(mode?: string) {
    switch (mode) {
        case 'salmonrun.bigrun':
            return 'text-bigrun-primary'
        case 'salmonrun.eggstrawork':
            return 'text-eggstra-primary'
        default:
            return 'text-salmonrun-primary'
    }
}
</script>
