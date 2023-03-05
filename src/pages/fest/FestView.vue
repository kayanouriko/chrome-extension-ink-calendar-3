<template>
    <div>
        <CardFest></CardFest>
        <Card
            v-for="(schedule, index) in festSchedules"
            :schedule="schedule"
            :battle-type="BattleType.Splatfest"
            :is-first="index === 0"
        ></Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../../components/card/Card.vue'
import CardFest from '../../components/card/CardFest.vue'

import { BattleType, useDatas } from '../../utils/datas'

const { festSchedules } = useDatas()
</script>
