<template>
    <BasePage :is-updating="isUpdating" :is-error="isError" @reload="update">
        <div v-if="gesotown" flex="~ col">
            <GearPickupView :brand="gesotown.pickupBrand" />
            <Divider mb-3 w-full />
            <!-- 在线销售 -->
            <p text-2xl text-yellow-400 my-6 self-center v-t="'splatnet-shop.sale'"></p>
            <GearCardView v-for="brandGear in gesotown.limitedGears" :is-pickup="false" :brand-gear="brandGear" />
            <!-- 结尾 -->
            <p text-gray-400 text-xs my-4 self-center v-t="'splatnet-shop.tip'"></p>
            <img my-4 w-64 self-center src="/assets/images/gesotown/logo.png" />
            <p text-xs text-white w-52 text-center self-center v-t="'splatnet-shop.tip1'"></p>
            <p text-2xl text-yellow-400 font-splatoon2 mt-6 mb-20 self-center v-t="'splatnet-shop.title'"></p>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGearStore } from '@popup/store/gear'

import BasePage from '@popup/pages/base/BasePage.vue'
import Divider from '@common/components/Divider.vue'
import GearPickupView from './GearPickupView.vue'
import GearCardView from './GearCardView.vue'

const { gesotown, isUpdating, isError } = storeToRefs(useGearStore())
const { update } = useGearStore()
// 获取更新数据
update()
</script>
