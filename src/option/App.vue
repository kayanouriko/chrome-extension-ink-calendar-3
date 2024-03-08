<template>
    <div
        class="bg-image"
        w-100vw
        h-100vh
        text-white
        text-base
        font-splatoon-content
        flex="~ col"
        justify-between
        items-center
        overflow-x-clip
        overflow-y-auto
        thin-scrollbar
    >
        <div></div>
        <div py-10 w-150 flex="~ col" space-y-8>
            <div flex justify-center items-center space-x-4>
                <img square-8 src="/icon/icon128.png" alt="logo" />
                <p text-3xl>Ink Calendar 3</p>
            </div>
            <GeneralView />
            <AboutView />
        </div>
        <FooterView pb-2 />
    </div>
</template>

<script setup lang="ts">
import GeneralView from './components/GeneralView.vue'
import AboutView from './components/AboutView.vue'
import FooterView from './components/FooterView.vue'
</script>

<style scoped>
.bg-image {
    background-image: url('/assets/images/ui/bg-animate.jpg');
}
</style>
