<template>
    <div class="text-center px-2 py-1 text-black rounded-sm z-10" :class="`${bgColor} ${fontSize}`">
        <div class="relative">
            <div class="absolute squid-tl top-0 left-0 bg-black w-[10px] h-[10px]"></div>
            <div class="absolute squid-br bottom-0 right-0 bg-black w-[10px] h-[10px]"></div>
            <p class="label border border-black px-4" v-t="tip"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { bgColor, tip } = withDefaults(
    defineProps<{
        bgColor?: string
        tip?: string
        fontSize?: string
    }>(),
    {
        bgColor: 'bg-[#84F4CE]',
        tip: 'splatnet-shop.dailydrop',
        fontSize: 'text-sm'
    }
)
</script>
