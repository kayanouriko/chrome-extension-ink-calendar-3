<template>
    <div h-12 mb-2 px-4 bg-backdrop rounded-full flex justify-center>
        <button v-for="item in tabbarItems" class="group" :key="item.key" @click="$emit('didChangeTabbarItem', item)">
            <div w-12 h-12 relative>
                <img v-show="selectedItem === item" absolute src="/assets/images/ui/bg-tabbar-item.png" />
                <img
                    :class="selectedItem === item ? 'grayscale-0' : 'grayscale'"
                    absolute
                    p-2
                    group-hover:grayscale-0
                    :src="item.icon"
                    :alt="item.name"
                />
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTabbarStore, TabbarItem } from './utils'

defineProps<{
    selectedItem: TabbarItem
}>()

defineEmits<{
    (event: 'didChangeTabbarItem', item: TabbarItem): void
}>()

const { tabbarItems } = storeToRefs(useTabbarStore())
</script>
