<template>
    <div>
        <CardIsFest v-show="isFestTime"></CardIsFest>
        <Card v-for="schedule in regularSchedules" :schedule="schedule" :battle-type="BattleType.Regular"></Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../../components/card/Card.vue'
import CardIsFest from '../../components/card/CardIsFest.vue'

import { BattleType, useData } from '../../utils/datas'

const { regularSchedules, isFestTime } = useData()
</script>
