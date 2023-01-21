<template>
    <div class="flex">
        <Navbar class="shrink-0" :selected-type="state.selectedType" @change-tab-type="changeTabType"></Navbar>
        <component :is="currentView"></component>
    </div>
</template>

<script setup lang="ts">
import Navbar from '../../components/Navbar.vue'
import AboutView from '../about/AboutView.vue'
import GeneralView from '../general/GeneralView.vue'

import { computed, reactive } from 'vue'
import { TabType } from '../../utils/control'
import { getCurrentLocale } from '../../../../src/utils/storage'
import { useI18n } from 'vue-i18n'

const currentLocale = await getCurrentLocale()
const { locale, t } = useI18n()
if (locale.value !== currentLocale.code) {
    locale.value = currentLocale.code
}
document.title = t('option.title')

const state = reactive({ selectedType: TabType.General })

function changeTabType(type: TabType) {
    state.selectedType = type
}

const currentView = computed(() => {
    switch (state.selectedType) {
        case TabType.General:
            return GeneralView
        case TabType.About:
            return AboutView
    }
})
</script>

<style scoped></style>
