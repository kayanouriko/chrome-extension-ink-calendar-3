<template>
    <a class="flex items-center p-6" :href="url" target="_blank">
        <div class="flex flex-col grow">
            <p class="text-sm">{{ text }}</p>
            <p v-if="secondaryText" class="text-xs text-gray-600 mt-1">{{ secondaryText }}</p>
        </div>
        <img class="w-2 h-1 origin-center -rotate-90" src="/images/arrow_down.svg" />
    </a>
</template>

<script setup lang="ts">
const { text, secondaryText, url } = defineProps<{
    text: string
    secondaryText?: string
    url: string
}>()
</script>
