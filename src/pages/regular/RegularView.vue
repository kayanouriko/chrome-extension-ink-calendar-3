<template>
    <div>
        <CardIsFest v-show="isFestTime"></CardIsFest>
        <Card
            v-for="(schedule, index) in regularSchedules"
            :schedule="schedule"
            :battle-type="BattleType.Regular"
            :is-first="index === 0"
        ></Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../../components/card/Card.vue'
import CardIsFest from '../../components/card/CardIsFest.vue'

import { BattleType, useDatas } from '../../utils/datas'

const { regularSchedules, isFestTime } = useDatas()
</script>
