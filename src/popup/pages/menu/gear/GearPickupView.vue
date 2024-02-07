<template>
    <div pb-4 flex="~ col">
        <img :src="image" :alt="t(`splatnet.brands.${id}.name`, name)" />
        <div class="-mt-10" self-center flex="~ col">
            <TagView self-center :title="t('splatnet-shop.dailydrop')" />
            <!-- 品牌 -->
            <div class="-mt-2" relative>
                <img w-72 h-12 src="/assets/images/gesotown/bg-dailydrop.png" />
                <div absolute inset-0 pt-2 flex justify-center items-center space-x-2>
                    <img
                        square-7
                        :src="powerImage"
                        :alt="t(`splatnet.powers.${powerId}.name`, powerName)"
                        :title="t(`splatnet.powers.${powerId}.name`, powerName)"
                    />
                    <p text-xl>{{ t(`splatnet.brands.${id}.name`, name) }}</p>
                </div>
            </div>
        </div>
        <p py-4 text-center text-sm text-tag-primary>{{ t('time.until', { time: saleEndTime }) }}</p>
        <!-- 销售的装备 -->
        <GearCardView v-for="brandGear in brandGears" :is-pickup="true" :brand-gear="brandGear" />
        <!-- 下个 pickup -->
        <div my-6 self-center flex="~ col">
            <TagView self-center :title="t('time.next')" bg-color="bg-[#7B88F3]" />
            <!-- 品牌 -->
            <div class="-mt-2" relative>
                <img w-72 h-12 src="/assets/images/gesotown/bg-dailydrop.png" />
                <div absolute inset-0 pt-2 flex justify-center items-center space-x-2>
                    <img
                        square-7
                        bg-white
                        rounded
                        :src="nextBrandImage"
                        :alt="t(`splatnet.brands.${nextBrandId}.name`, nextBrandName)"
                        :title="t(`splatnet.brands.${nextBrandId}.name`, nextBrandName)"
                    />
                    <p text-xl>{{ t(`splatnet.brands.${nextBrandId}.name`, nextBrandName) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PickupBrand } from '@popup/store/gear'

import TagView from '@/popup/components/TagView.vue'
import GearCardView from './GearCardView.vue'

const { brand } = defineProps<{
    brand: PickupBrand
}>()

const {
    image,
    saleEndTime,
    brand: {
        name,
        id,
        usualGearPower: { __splatoon3ink_id: powerId, name: powerName, image: powerImage }
    },
    brandGears,
    nextBrand: { name: nextBrandName, id: nextBrandId, image: nextBrandImage }
} = brand
const { t } = useI18n()
</script>
