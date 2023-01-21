<template>
    <Suspense>
        <BaseView></BaseView>
        <template #fallback> loading... </template>
    </Suspense>
</template>

<script setup lang="ts">
import BaseView from './pages/base/BaseView.vue'
</script>

<style>
@import '@/assets/css/tailwindcss.css';
</style>
