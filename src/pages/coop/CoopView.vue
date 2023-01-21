<template>
    <div>
        <template v-for="(schedule, index) in coopSchedules">
            <CoopCardNow v-if="index == 0" :schedule="schedule"></CoopCardNow>
            <CoopCard v-else :schedule="schedule"></CoopCard>
        </template>
    </div>
</template>

<script setup lang="ts">
import CoopCardNow from './CoopCardNow.vue'
import CoopCard from './CoopCard.vue'

import { useData } from '../../utils/datas'

const { coopSchedules } = useData()
</script>
