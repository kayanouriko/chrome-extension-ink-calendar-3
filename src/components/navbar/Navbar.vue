<template>
    <div class="bg-black flex justify-between items-center">
        <router-link to="/gear">
            <img class="w-9 h-9 ml-2" src="/images/network_shop.png" />
        </router-link>
        <div class="flex items-center">
            <img class="mr-1 my-1 w-9 h-9" :src="BattleType.getTypeIcon(selectedType)" />
            <h1 class="text-white text-xl font-splatoon1" v-t="BattleType.getTypeTitle(selectedType)"></h1>
        </div>
        <button @click="openOptionsPage">
            <img class="w-8 h-8 mr-3" src="/images/settings.png" alt="" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { BattleType } from '../../utils/datas'

const { selectedType } = defineProps<{
    selectedType: BattleType
}>()
// 打开 option 页面
const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
}
</script>
