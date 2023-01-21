<template>
    <Suspense>
        <BaseView></BaseView>
        <!-- <DemoView></DemoView> -->
        <template #fallback>
            <LodingView></LodingView>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import LodingView from './components/loading/LodingView.vue'
import BaseView from './pages/base/BaseView.vue'
</script>

<style>
@import './assets/css/tailwindcss.css';
</style>
