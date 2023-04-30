<template>
    <NavigationController>
        <template #navigation>
            <img class="w-9 h-9 my-1 mr-1" src="/images/tricolor.png" />
            <p v-t="'navbar.splatfestStats'"></p>
        </template>
        <AllFestView></AllFestView>
    </NavigationController>
</template>

<script setup lang="ts">
import NavigationController from '../../components/navigation/NavigationController.vue'
import AllFestView from './AllFestView.vue'
</script>
