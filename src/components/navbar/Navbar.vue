<template>
    <div class="bg-black flex justify-between items-center">
        <button @click="isPush = true">
            <img class="w-9 h-9 ml-2" src="/images/network_shop.png" />
        </button>
        <div class="flex items-center">
            <img class="mr-1 my-1 w-9 h-9" :src="getTypeIcon(selectedType)" />
            <h1 class="text-white text-xl font-splatoon1" v-t="getTypeTitle(selectedType)"></h1>
        </div>
        <button @click="openOptionsPage">
            <img class="w-8 h-8 mr-3" src="/images/settings.png" alt="" />
        </button>
        <Teleport to="body">
            <GearBaseView v-if="isPush" @close="isPush = false"></GearBaseView>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import GearBaseView from '../../pages/gear/GearBaseView.vue'

import { ref } from 'vue'
import { BattleType, useData } from '../../utils/datas'

const { selectedType } = defineProps<{
    selectedType: BattleType
}>()

const { getTypeIcon, getTypeTitle } = useData()
// 打开 option 页面
const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
}
// push 到 gear 页面
const isPush = ref(false)
</script>
