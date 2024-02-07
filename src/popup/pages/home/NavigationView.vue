<template>
    <div px-2 h-12 bg-black flex justify-between items-center>
        <RouterLink to="/menu/home">
            <img square-7 src="/assets/images/ui/btn-menu.png" alt="menu" />
        </RouterLink>
        <div flex items-center>
            <img p-2 square-12 :src="selectedItem.icon" :alt="selectedItem.name" />
            <p pr-2 text-xl font-splatoon-title v-t="selectedItem.name" />
        </div>
        <div square-7 />
    </div>
</template>

<script setup lang="ts">
import { TabbarItem } from './utils'

defineProps<{
    selectedItem: TabbarItem
}>()
</script>
