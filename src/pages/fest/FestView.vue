<template>
    <div>
        <CardFest></CardFest>
        <Card v-for="schedule in festSchedules" :schedule="schedule" :battle-type="BattleType.Splatfest"></Card>
    </div>
</template>

<script setup lang="ts">
import Card from '../../components/card/Card.vue'
import CardFest from '../../components/card/CardFest.vue'

import { BattleType, useData } from '../../utils/datas'

const { festSchedules } = useData()
</script>
