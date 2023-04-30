<template>
    <NavigationController>
        <template #navigation>
            <img class="w-9 h-9 my-1 mr-1" src="/images/network_shop.png" />
            <p v-t="'splatnet-shop.title'"></p>
        </template>
        <GearView></GearView>
    </NavigationController>
</template>

<script setup lang="ts">
import NavigationController from '../../components/navigation/NavigationController.vue'
import GearView from './GearView.vue'
</script>
