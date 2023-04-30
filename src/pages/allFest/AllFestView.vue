<template>
    <div class="h-full overflow-auto thin-scrollbar p-3 flex flex-col space-y-3">
        <p class="pt-6 text-white text-xl self-center font-splatoon2" v-t="'splatfest.subTitle'"></p>
        <AllFestCard
            v-for="(record, index) in festRecords"
            :key="record.__splatoon3ink_id"
            :is-first="index === 0"
            :record="record"
        ></AllFestCard>
    </div>
</template>

<script setup lang="ts">
import AllFestCard from './AllFestCard.vue'

import { createDatas, updateFestDatas } from '../../utils/festDatas'

const festRecords = await updateFestDatas()
createDatas(festRecords)
</script>
