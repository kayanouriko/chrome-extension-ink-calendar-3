<template>
    <div>
        <CardIsFest v-show="isFestTime"></CardIsFest>
        <Card
            v-for="(schedule, index) in bankaraSchedules"
            :schedule="schedule"
            :battle-type="BattleType.Bankara"
            :is-first="index === 0"
        ></Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../../components/card/Card.vue'
import CardIsFest from '../../components/card/CardIsFest.vue'

import { BattleType, useDatas } from '../../utils/datas'

const { bankaraSchedules, isFestTime } = useDatas()
</script>
