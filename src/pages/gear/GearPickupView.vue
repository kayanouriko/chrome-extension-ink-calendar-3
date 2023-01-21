<template>
    <div class="flex flex-col items-center mb-12 font-splatoon2">
        <img class="-mb-10" :src="image.url" />
        <!-- 今日精选 -->
        <div class="flex flex-col items-start -space-y-1 -rotate-3">
            <GearTip class="-ml-2"></GearTip>
            <div class="relative">
                <img class="w-72" src="/images/gesotown_daily_drop_bg.png" />
                <div class="absolute inset-0 flex items-center ml-4">
                    <img class="w-8 h-8 bg-slate-800 rounded-full p-1" :src="brand.usualGearPower.image.url" />
                    <img class="w-2 h-3 -ml-2 -mb-4 animate-bounce" src="/images/arrow_up.png" />
                    <p class="top-2 text-2xl ml-2 text-white" v-t="`splatnet.brands.${pickupBrand.brand.id}.name`"></p>
                </div>
            </div>
        </div>
        <!-- 时间 -->
        <p class="text-xs px-3 mt-6 bg-red-500">{{ t('time.now') + '!' }}</p>
        <p class="flex justify-between text-red-500 text-base space-x-2 mt-1 mb-4">
            {{ t('time.until', { time: showTime }) }}
        </p>
        <!-- 精选衣服 -->
        <GearCardView v-for="gear in pickupBrand.brandGears" :is-pickup="true" :gear="gear"></GearCardView>
        <!-- next pick up -->
        <div class="flex flex-col items-center mt-8">
            <GearTip tip="time.next" bg-color="bg-[#7B88F3]" font-size="text-xs"></GearTip>
            <div class="relative -mt-2">
                <img class="w-64" src="/images/tape_1.png" />
                <div class="absolute inset-0 flex justify-center items-center pb-2 pt-4 px-12 -mt-1 space-x-2">
                    <div class="relative">
                        <img class="w-10" src="/images/gesotown_brand_bg.png" />
                        <div class="flex justify-center items-center absolute inset-0">
                            <img class="p-1" :src="nextBrand.image.url" />
                        </div>
                    </div>
                    <p class="text-2xl text-white" v-t="`splatnet.brands.${nextBrand.id}.name`"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GearCardView from './GearCardView.vue'
import GearTip from './GearTip.vue'

import { PickupBrand } from '../../utils/gearDatas'
import { useI18n } from 'vue-i18n'
import '../../extension/date.extension'

const { pickupBrand } = defineProps<{
    pickupBrand: PickupBrand
}>()

const { t } = useI18n()
const { image, brand, saleEndTime, nextBrand } = pickupBrand

const time = new Date(saleEndTime)
const showTime = time.getYearMonthDayTime() + ' ' + time.getHourMinTime()
</script>

<style>
/* splatoon3.ink style */
.squid-tl {
    mask-image: url('/images/squid_tl.svg');
    mask-repeat: no-repeat;
    mask-size: contain;
}

.squid-br {
    mask-image: url('/images/squid_br.svg');
    mask-repeat: no-repeat;
    mask-size: contain;
}

.label {
    clip-path: polygon(
        -5px 10px,
        10px 10px,
        10px -5px,
        100% -5px,
        100% calc(100% - 10px),
        calc(100% - 10px) calc(100% - 10px),
        calc(100% - 10px) calc(100% + 10px),
        0 calc(100% + 10px)
    );
}
</style>
