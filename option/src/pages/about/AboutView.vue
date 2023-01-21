<template>
    <div class="flex flex-col w-full px-60 pb-10">
        <div class="flex flex-col justify-center w-[600px]">
            <p class="text-base mt-10 font-semibold" v-t="'option.about.title'"></p>
            <div class="rounded shadow py-4 my-4 text-sm divide-y">
                <div class="px-6">
                    <h1 class="text-base mb-3">这是什么?</h1>
                    <p>
                        该项目是基于
                        <a class="underline" href="https://splatoon3.ink/">Splatoon3.ink</a> 提供的
                        <a class="underline" href="https://github.com/misenhower/splatoon3.ink/wiki/Data-Access"
                            >Data Access</a
                        >
                        制作的任天堂 Splatoon 3 非官方应用.
                    </p>
                    <p>
                        该项目是开源的, 你可以在
                        <a class="underline" href="https://github.com/kayanouriko/chrome-extension-ink-calendar-3"
                            >Github</a
                        >
                        上查看源代码.
                    </p>
                    <h1 class="text-base mt-4 mb-3">由来</h1>
                    <p>
                        这其实是 iOS / macOS 项目失败后的产物, 加之任天堂官方已在手机端添加的小组件功能(虽然不太好看),
                        所以我就开始转向 web 项目开发.
                    </p>
                    <p>
                        这也算是我比较正式的第一个基于 Vue + TS + Vite + Tailwind CSS 的 web 前端个人项目了.
                        希望大家能够喜欢.
                    </p>
                </div>
                <div class="px-6 mt-6">
                    <p class="text-xs text-gray-600 mt-4">
                        This extension is not affiliated with Nintendo. All product names, logos, and brands are
                        property of their respective owners.
                    </p>
                </div>
            </div>
            <p class="text-base mt-10 font-semibold" v-t="'option.about.thanks'"></p>
            <div class="rounded shadow my-2 text-sm divide-y">
                <AboutCard v-for="credit in credits" v-bind="credit"></AboutCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AboutCard from './AboutCard.vue'

const credits = [
    {
        text: 'Splatoon3.ink',
        secondaryText: "This site is a fan-made, unofficial source of information for Nintendo's Splatoon 3.",
        url: 'https://splatoon3.ink/'
    },
    {
        text: 'i18ns',
        secondaryText:
            'i18ns provide a free and easy app international translation service, it can be used in android app, ios app or web app i18n translation.',
        url: 'https://i18ns.com/'
    },
    {
        text: 'Vue.js',
        secondaryText:
            'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
        url: 'https://vuejs.org/'
    },
    {
        text: 'TypeScript',
        secondaryText: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
        url: 'secondaryText'
    },
    {
        text: 'Tailwind CSS',
        secondaryText:
            'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
        url: 'https://tailwindcss.com/'
    },
    {
        text: 'Vite',
        secondaryText: "Next generation frontend tooling. It's fast!",
        url: 'https://vitejs.dev/'
    }
]
</script>
