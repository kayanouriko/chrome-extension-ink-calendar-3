<template>
    <div flex items-center>
        <div class="-mr-1" w-3 h-1 bg-yellow-4 />
        <p px-2 my-2 text-xs text-center text-black rounded-full bg-yellow-4 font-splatoon-title>
            {{ timePeriod }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    timePeriod: string
}>()
</script>
