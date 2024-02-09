<template>
    <div :class="`${bgColor} ${fontSize}`" p="x-2 y-1" rounded-sm text-center text-black>
        <div relative>
            <div class="w-10px h-10px" absolute squid-tl top-0 left-0 bg-black />
            <div class="w-10px h-10px" absolute squid-br bottom-0 right-0 bg-black />
            <p px-4 border="~ black" text-xs squid-label v-t="title" />
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        bgColor?: string
        title?: string
        fontSize?: string
    }>(),
    {
        bgColor: 'bg-tag-primary',
        title: 'time.next',
        fontSize: 'text-sm'
    }
)
</script>
