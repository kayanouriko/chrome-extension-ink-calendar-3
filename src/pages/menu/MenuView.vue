<template>
    <div
        class="w-[360px] h-[600px] px-2 bg-slate-800 overflow-auto thin-scrollbar bg-[url(/images/menu_bg.png)] bg-repeat flex flex-col items-center"
    >
        <div class="w-full h-[44px] flex">
            <button @click="backAction">
                <img class="w-6 h-6" src="/images/btn_prev.png" />
            </button>
        </div>
        <img class="w-[150px] mt-4" src="/images/logo.png" />
        <div class="w-[260px] mt-10 grid grid-cols-2 gap-y-4 text-white text-lg font-splatoon2">
            <button
                class="flex flex-col justify-center items-center hover:transition-transform hover:scale-105"
                v-for="item in items"
                @click="btnAction(item.id)"
            >
                <img class="w-12 h-12 rounded-xl" :src="item.icon" />
                <p v-t="item.title"></p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const items = [
    {
        icon: '/images/network_shop.png',
        title: 'splatnet-shop.title',
        id: 'splatnet-shop'
    },
    {
        icon: '/images/x.svg',
        title: 'xrank.title',
        id: 'xrank'
    },
    {
        icon: '/images/tricolor.png',
        title: 'splatfest.title',
        id: 'splatfest'
    },
    {
        icon: '/images/settings.png',
        title: 'option.title',
        id: 'option'
    }
]

function backAction() {
    router.back()
}

function btnAction(title: string) {
    switch (title) {
        case 'splatfest':
            router.push('/splatfest')
            break
        case 'xrank':
            router.push('/x')
            break
        case 'splatnet-shop':
            router.push('/gear')
            break
        case 'option':
            openOptionsPage()
            break
    }
}

// 打开 option 页面
function openOptionsPage() {
    chrome.runtime.openOptionsPage()
}
</script>
