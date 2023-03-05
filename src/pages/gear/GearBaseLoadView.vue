<template>
    <Suspense>
        <GearView></GearView>
        <template #fallback>
            <LodingView></LodingView>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import GearView from './GearView.vue'
import LodingView from '../../components/loading/LodingView.vue'
</script>
