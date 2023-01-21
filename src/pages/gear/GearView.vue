<template>
    <div class="w-[360px] h-[600px] flex flex-col bg-slate-800">
        <!-- navbar -->
        <div class="bg-black flex justify-between font-splatoon2 text-xl text-white px-2">
            <button @click="$emit('close')">
                <img class="w-6 h-6" src="/images/btn_prev.png" />
            </button>
            <div class="flex items-center">
                <img class="w-9 h-9 my-1 mr-1" src="/images/network_shop.png" />
                <p v-t="'splatnet-shop.title'"></p>
            </div>
            <div class="w-6 h-6 invisible"></div>
        </div>
        <div class="overflow-auto thin-scrollbar flex flex-col items-center">
            <!-- pickup -->
            <GearPickupView :pickup-brand="pickupBrand"></GearPickupView>
            <div class="divide-y divide-dotted divide-slate-500 mb-3 w-full">
                <div></div>
                <div></div>
            </div>
            <p class="font-splatoon2 text-2xl text-yellow-400 my-8" v-t="'splatnet-shop.sale'"></p>
            <!-- list -->
            <GearCardView v-for="gear in gears" :gear="gear"></GearCardView>
            <p class="text-slate-400 text-xs my-4" v-t="'splatnet-shop.tip'"></p>
            <img class="my-4 w-64" src="/images/network_shop_logo.png" />
            <p class="text-xs text-white w-52 text-center" v-t="'splatnet-shop.tip1'"></p>
            <p class="text-2xl text-yellow-400 font-splatoon2 mt-6 mb-20" v-t="'splatnet-shop.title'"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import GearPickupView from './GearPickupView.vue'
import GearCardView from './GearCardView.vue'

import { getPickupBrand, getLimitedGears, updateGearDatas } from '../../utils/gearDatas'

defineEmits<{
    (event: 'close'): void
}>()

// 更新数据
await updateGearDatas()
const pickupBrand = getPickupBrand()
const gears = getLimitedGears()
</script>
