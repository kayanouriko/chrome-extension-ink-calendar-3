<template>
    <div px-4 py-2 bg-white bg-op-10 rounded flex="~ col" space-y-2>
        <p text-2xl v-t="'option.about.thanks'"></p>
        <AboutCardView v-for="credit in credits" :item="credit" />
    </div>
</template>

<script setup lang="ts">
import AboutCardView from './AboutCardView.vue'

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
    }
]
</script>
