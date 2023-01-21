<template>
    <div>
        <CardIsFest v-show="isFestTime"></CardIsFest>
        <Card v-for="schedule in xSchedules" :schedule="schedule" :battle-type="BattleType.X"></Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../../components/card/Card.vue'
import CardIsFest from '../../components/card/CardIsFest.vue'

import { BattleType, useData } from '../../utils/datas'

const { xSchedules, isFestTime } = useData()
</script>
