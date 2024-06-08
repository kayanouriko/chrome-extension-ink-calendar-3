<template>
    <div pt-2 flex="~ col" items-center>
        <p px-2>{{ t('splatfest.name') }}</p>
        <p px-2 pb-2 text-sm>{{ t('splatfest.midterm-time', [midtermTime]) }}</p>
        <img class="w-[calc(100%-3.5rem)]" h-5.125rem object-cover rounded-lg :src="stage.image" alt="" />
        <p class="-mt-2" px-1 py-0.5 text-xs bg-black>{{ t(`splatnet.stages.${stage.id}.name`, stage.name) }}</p>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { TricolorStage } from '@popup/store/schedules'

defineProps<{
    midtermTime: string
    stage: TricolorStage
}>()

const { t } = useI18n()
</script>
