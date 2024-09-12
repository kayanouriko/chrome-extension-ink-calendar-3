<template>
    <div class="bg-image" mx-2 my-0.5 pl-4 py-4 flex items-center space-x-4>
        <!-- 装备图标 -->
        <img square-20 :src="gearImage" :alt="t(`splatnet.gear.${gearId}.name`, gearName)" />
        <!-- 右侧信息栏 -->
        <div grow flex="~ col" space-y-2>
            <p v-if="!isPickup" text-xs text-yellow-400>
                {{ t('time.until', { time: showTime }) }}
            </p>
            <div flex items-center space-x-2>
                <img
                    v-if="brandImage"
                    w-6
                    bg-white
                    rounded
                    :src="brandImage"
                    :alt="t(`splatnet.brands.${brandId}.name`, brandName)"
                    :title="t(`splatnet.brands.${brandId}.name`, brandName)"
                />
                <p>{{ t(`splatnet.gear.${gearId}.name`, gearName) }}</p>
            </div>
            <div flex justify-between items-center>
                <!-- 技能点 -->
                <div flex items-center>
                    <img
                        square-8
                        :src="primaryPowerImage"
                        :alt="t(`splatnet.powers.${primaryPowerId}.name`, primaryPowerName)"
                        :title="t(`splatnet.powers.${primaryPowerId}.name`, primaryPowerName)"
                    />
                    <img
                        v-for="power in additionalGearPowers"
                        square-6
                        :src="power.image"
                        :alt="t(`splatnet.powers.${power.__splatoon3ink_id}.name`, power.name)"
                        :title="t(`splatnet.powers.${power.__splatoon3ink_id}.name`, power.name)"
                    />
                </div>
                <!-- 价格 -->
                <div relative>
                    <img class="w-[120px] h-[31px]" src="/assets/images/gesotown/bg-price.png" />
                    <div class="absolute inset-0 flex items-center px-2 space-x-1">
                        <img src="/assets/images/gesotown/coin.svg" />
                        <p class="font-splatoon2 text-base text-white">{{ price }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BrandGear } from '@popup/store/gear'

const { isPickup = false, brandGear } = defineProps<{
    isPickup: boolean
    brandGear: BrandGear
}>()

const { t } = useI18n()
const {
    price,
    showTime,
    gear: {
        __splatoon3ink_id: gearId,
        name: gearName,
        image: gearImage,
        brand: { id: brandId, name: brandName, image: brandImage },
        primaryGearPower: { __splatoon3ink_id: primaryPowerId, name: primaryPowerName, image: primaryPowerImage },
        additionalGearPowers
    }
} = brandGear
</script>

<style scoped>
.bg-image {
    background-image: url('/assets/images/gesotown/bg-dailydrop.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
