<template>
    <div p="x-2" flex items-center space-x-2>
        <img w-6 h-6 :src="vsRule.icon" alt="rule logo" />
        <p>{{ t(`splatnet.rules.${vsRule.id}.name`, vsRule.name) }}</p>
        <p v-if="modeName" px-1 text-xs bg-violet-6>
            {{ t(modeName, mode ?? '') }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ScheduleRule } from '@popup/store/schedules'

defineProps<{
    vsRule: ScheduleRule
    mode?: string
    modeName?: string
}>()

const { t } = useI18n()
</script>
