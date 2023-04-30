<template>
    <NavigationController>
        <template #navigation>
            <img class="w-9 h-9 my-1 mr-1" src="/images/x.svg" />
            <p v-t="'navbar.xrank'"></p>
        </template>
        <AllXView></AllXView>
    </NavigationController>
</template>

<script setup lang="ts">
import NavigationController from '../../components/navigation/NavigationController.vue'
import AllXView from './AllXView.vue'
</script>
