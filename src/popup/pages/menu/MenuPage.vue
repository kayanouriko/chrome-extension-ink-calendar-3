<template>
    <div class="bg-animate" w-full h-full flex="~ col">
        <NavigationView />
        <RouterView v-slot="{ Component }">
            <component grow overflow-y-auto overflow-x-clip thin-scrollbar :is="Component" />
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import NavigationView from './NavigationView.vue'
</script>

<style scoped>
@-webkit-keyframes scrollAnimate {
    0% {
        background-position: left bottom;
    }
    50% {
        background-position: top right;
    }
    100% {
        background-position: left bottom;
    }
}

@keyframes scrollAnimate {
    0% {
        background-position: left bottom;
    }
    50% {
        background-position: top right;
    }
    100% {
        background-position: left bottom;
    }
}

.bg-animate {
    background-image: url('/assets/images/ui/bg-animate.jpg');
    background-attachment: fixed;
    -webkit-animation: scrollAnimate 100s linear infinite;
    animation: scrollAnimate 100s linear infinite;
}
</style>
