<template>
    <div class="bg-black flex justify-between items-center font-splatoon2 text-xl text-white px-2">
        <button @click="backAction">
            <img class="w-6 h-6" src="/images/btn_prev.png" />
        </button>
        <div class="flex items-center">
            <slot></slot>
        </div>
        <div class="w-6 h-6 invisible"></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function backAction() {
    router.back()
}
</script>
