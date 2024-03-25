<template>
    <div pb-2 flex="~ col">
        <!-- 时间部分 -->
        <div class="flex items-center">
            <div class="-mr-1" w-3 h-1 bg-yellow-4 />
            <div px-2 text-xs text-black rounded-full bg-yellow-4 font-splatoon-title>
                {{ schedule.showTime }}
            </div>
        </div>
        <!-- 日程状态时开办状态的时候额外的信息展示 -->
        <p v-if="schedule.status === 'active'" px-2 mt-2 text-sm text-salmonrun-primary>
            {{ t('navbar.salmonrun') + ' ' + t('time.open') }}
        </p>
        <!-- 模式 -->
        <div v-if="schedule.mode && schedule.modeIcon" px-2 mt-2 flex items-center space-x-1>
            <img square-6 :src="schedule.modeIcon" :alt="t(schedule.mode)" />
            <p :class="getColor(schedule.mode)" text-sm>{{ t(schedule.mode) }}</p>
        </div>
        <!-- 地图 boss 武器 -->
        <div mt-3 px-2 flex items-center space-x-4>
            <div class="w-55%" flex="~ col" items-center>
                <img
                    w-full
                    h-14
                    rounded-lg
                    object-cover
                    bg-white
                    bg-op-30
                    :src="stageUrl"
                    :alt="t(`splatnet.stages.${stageId}.name`, stageName)"
                />
                <p class="-mt-2" px-1 py-0.5 text-xs bg-black>{{ t(`splatnet.stages.${stageId}.name`, stageName) }}</p>
            </div>
            <!-- boss 武器 -->
            <div class="-mt-2" flex="~ col" space-y-2>
                <div v-if="boss" flex items-center space-x-1>
                    <img w-5 h-5 :src="boss.icon" :alt="t(`splatnet.bosses.${boss.id}.name`, boss.name)" />
                    <p text-sm>{{ t(`splatnet.bosses.${boss.id}.name`, boss.name) }}</p>
                </div>
                <p v-else text-sm>{{ t('salmonrun.weapons') }}</p>
                <div px-2 py-0.5 bg-white bg-op-30 rounded-full flex items-center space-x-1>
                    <img
                        v-for="weapon in weapons"
                        w-6
                        h-6
                        :src="weapon.image"
                        :alt="t(`splatnet.weapons.${weapon.__splatoon3ink_id}.name`, weapon.name)"
                        :title="t(`splatnet.weapons.${weapon.__splatoon3ink_id}.name`, weapon.name)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CoopSchedule } from '@popup/store/schedules'

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
