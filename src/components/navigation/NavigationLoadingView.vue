<template>
    <Suspense>
        <slot></slot>
        <template #fallback>
            <LodingView></LodingView>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import LodingView from '../loading/LodingView.vue'
</script>
