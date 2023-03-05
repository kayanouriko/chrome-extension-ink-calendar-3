<template>
    <div class="w-[360px] h-[600px] flex flex-col bg-slate-800">
        <!-- navbar -->
        <div class="bg-black flex justify-between items-center font-splatoon2 text-xl text-white px-2">
            <button @click="backAction">
                <img class="w-6 h-6" src="/images/btn_prev.png" />
            </button>
            <div class="flex items-center">
                <img class="w-9 h-9 my-1 mr-1" src="/images/network_shop.png" />
                <p v-t="'splatnet-shop.title'"></p>
            </div>
            <div class="w-6 h-6 invisible"></div>
        </div>
        <!-- 异步组件 -->
        <GearBaseLoadView></GearBaseLoadView>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import GearBaseLoadView from './GearBaseLoadView.vue'

const router = useRouter()

function backAction() {
    router.back()
}
</script>
