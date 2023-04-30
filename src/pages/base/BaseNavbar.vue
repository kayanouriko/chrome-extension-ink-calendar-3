<template>
    <div class="px-2 h-[44px] bg-black flex justify-between items-center">
        <router-link to="/menu">
            <img class="w-7 h-7" src="/images/btn_open.png" />
        </router-link>
        <div class="flex items-center">
            <img class="mr-1 my-1 w-9 h-9" :src="BattleType.getTypeIcon(selectedType)" />
            <h1 class="text-white text-xl font-splatoon1" v-t="BattleType.getTypeTitle(selectedType)"></h1>
        </div>
        <div class="w-7 h-7"></div>
    </div>
</template>

<script setup lang="ts">
import { BattleType } from '../../utils/datas'

const { selectedType } = defineProps<{
    selectedType: BattleType
}>()
</script>
