<template>
    <div class="w-[calc(100%-24px)] flex bg-slate-700 mx-3 mt-1 rounded-lg p-3 space-x-2">
        <img class="w-20 h-20" :src="gear.gear.image.url" />
        <div class="grow flex flex-col font-splatoon2 space-y-2">
            <div class="flex space-x-2">
                <p class="text-xs text-yellow-500">{{ t('time.until', { time: showTime }) }}</p>
                <p v-if="isPickup" class="text-slate-700 text-xs bg-yellow-500 px-1" v-t="'splatnet-shop.pickup'"></p>
            </div>

            <div class="flex space-x-2 items-center">
                <img class="bg-white h-6 aspect-square rounded" :src="gear.gear.brand.image.url" />
                <p class="text-base text-white" v-t="`splatnet.gear.${gear.gear.__splatoon3ink_id}.name`"></p>
            </div>
            <div class="flex justify-around">
                <div class="grow flex items-end space-x-0.5">
                    <img class="h-8 bg-black rounded-full p-1" :src="gear.gear.primaryGearPower.image.url" />
                    <img
                        v-for="power in gear.gear.additionalGearPowers"
                        class="h-6 bg-black rounded-full"
                        :src="power.image.url"
                    />
                </div>
                <div class="relative -mr-5">
                    <img class="w-[120px] h-[31px]" src="/images/gesotown_price_bg.png" />
                    <div class="absolute inset-0 flex items-center px-2 space-x-1">
                        <img src="/images/gesotown_coin.svg" />
                        <p class="font-splatoon2 text-base text-white">{{ gear.price }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Gear } from '../../utils/gearDatas'
import { useI18n } from 'vue-i18n'

const { gear } = withDefaults(
    defineProps<{
        gear: Gear
        isPickup?: boolean
    }>(),
    {
        isPickup: false
    }
)

const { t } = useI18n()
const saleEndTime = new Date(gear.saleEndTime)
const nowTime = new Date()
const monthDay = saleEndTime.getMonthDayTime()
const hourMin = saleEndTime.getHourMinTime()
let showTime = hourMin
if (nowTime.setHours(0, 0, 0, 0) !== saleEndTime.setHours(0, 0, 0, 0)) {
    showTime = monthDay + ' ' + hourMin
}
</script>
