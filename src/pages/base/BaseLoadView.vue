<template>
    <Suspense>
        <BaseView></BaseView>
        <template #fallback>
            <LodingView></LodingView>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import BaseView from './BaseView.vue'
import LodingView from '../../components/loading/LodingView.vue'
</script>
