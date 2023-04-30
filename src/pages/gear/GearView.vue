<template>
    <div class="overflow-auto thin-scrollbar h-full flex flex-col items-center">
        <!-- pickup -->
        <GearPickupView :pickup-brand="pickupBrand"></GearPickupView>
        <div class="divide-y divide-dotted divide-slate-500 mb-3 w-full">
            <div></div>
            <div></div>
        </div>
        <p class="font-splatoon2 text-2xl text-yellow-400 my-8" v-t="'splatnet-shop.sale'"></p>
        <!-- list -->
        <GearCardView v-for="gear in limitedGears" :gear="gear"></GearCardView>
        <p class="text-slate-400 text-xs my-4" v-t="'splatnet-shop.tip'"></p>
        <img class="my-4 w-64" src="/images/network_shop_logo.png" />
        <p class="text-xs text-white w-52 text-center" v-t="'splatnet-shop.tip1'"></p>
        <p class="text-2xl text-yellow-400 font-splatoon2 mt-6 mb-20" v-t="'splatnet-shop.title'"></p>
    </div>
</template>

<script setup lang="ts">
import GearPickupView from './GearPickupView.vue'
import GearCardView from './GearCardView.vue'

import { updateGearDatas, createDatas, useDatas } from '../../utils/gearDatas'

// 更新数据
const datas = await updateGearDatas()
createDatas(datas)
const { pickupBrand, limitedGears } = useDatas()
</script>
