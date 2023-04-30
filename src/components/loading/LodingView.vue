<template>
    <div
        class="w-[360px] bg-[#2A2E35] flex flex-col justify-center items-center"
        :class="isFullscreen ? 'h-[600px]' : 'h-full'"
    >
        <img class="w-16 h-16" src="/images/loading.gif" />
        <p class="font-splatoon2 text-white text-base">Loading...</p>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        isFullscreen: boolean
    }>(),
    {
        isFullscreen: false
    }
)
</script>
