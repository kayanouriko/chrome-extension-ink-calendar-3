<template>
    <div p-2 flex space-x-0.5>
        <div v-for="(stage, index) in vsStages" flex="~ col" items-center>
            <img
                class="w-10.25rem h-5.125rem"
                :class="index ? 'rounded-tr-lg rounded-br-lg' : 'rounded-tl-lg rounded-bl-lg'"
                bg-white
                bg-op-30
                :src="stage.image"
            />
            <p v-if="stage.name.length" class="-mt-2" px-1 py-0.5 text-xs bg-black>
                {{ t(`splatnet.stages.${stage.id}.name`, stage.name) }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ScheduleStage } from '@/popup/store/schedules'

defineProps<{
    vsStages: ScheduleStage[]
}>()

const { t } = useI18n()
</script>
