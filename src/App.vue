<template>
    <router-view v-slot="{ Component }">
        <KeepAlive>
            <component :is="Component" />
        </KeepAlive>
    </router-view>
</template>

<script setup lang="ts"></script>

<style>
@import './assets/css/tailwindcss.css';
</style>
