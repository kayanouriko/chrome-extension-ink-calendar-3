<template>
    <a py-2 flex items-center space-x-2 :href="url" target="_blank">
        <div grow flex="~ col" space-y-1>
            <p text-xl>{{ text }}</p>
            <p text-sm>{{ secondaryText }}</p>
        </div>
        <p>{{ '>' }}</p>
    </a>
</template>

<script setup lang="ts">
const { item } = defineProps<{
    item: {
        text: string
        secondaryText: string
        url: string
    }
}>()

const { text, secondaryText, url } = item
</script>
