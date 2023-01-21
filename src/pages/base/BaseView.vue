<template>
    <div class="w-[360px] h-[600px] bg-slate-50 flex flex-col">
        <Navbar :selected-type="state.selectedType"></Navbar>
        <KeepAlive>
            <component class="grow overflow-y-auto thin-scrollbar bg-slate-800" :is="currentView"></component>
        </KeepAlive>
        <Tabbar :selected-type="state.selectedType" @change-tabbar-type="changeTabbarType"></Tabbar>
    </div>
</template>

<script setup lang="ts">
import Navbar from '../../components/navbar/Navbar.vue'
import BankaraView from '../bankara/BankaraView.vue'
import RegularView from '../regular/RegularView.vue'
import XView from '../x/XView.vue'
import CoopView from '../coop/CoopView.vue'
import FestView from '../fest/FestView.vue'
import Tabbar from '../../components/tabbar/Tabbar.vue'

import { reactive, computed } from 'vue'
import { BattleType, useData } from '../../utils/datas'
import { getCurrentLocale, getLastBattleType, setLastBattleType } from '../../utils/storage'
import { useI18n } from 'vue-i18n'
import { useInkI18n } from '../../utils/useI18n'

// 先切换环境
const currentLocale = await getCurrentLocale()
const { locale } = useI18n()
const { changeSplatfont } = useInkI18n()
if (locale.value !== currentLocale.code) {
    locale.value = currentLocale.code
}
if (currentLocale.code === 'zh-CN' || currentLocale.code === 'zh-TW') {
    changeSplatfont(currentLocale.code)
}
// 请求数据
const { initData } = useData()
await initData()
// 正常流程
const { isFestTime, currentBattleTypes } = useData()
const defaultType = isFestTime ? BattleType.Splatfest : BattleType.Bankara
const battleType = await getLastBattleType(defaultType, currentBattleTypes)
const state = reactive({ selectedType: battleType })

function changeTabbarType(type: BattleType) {
    state.selectedType = type
    setLastBattleType(type)
}

const currentView = computed(() => {
    switch (state.selectedType) {
        case BattleType.Bankara:
            return BankaraView
        case BattleType.Regular:
            return RegularView
        case BattleType.X:
            return XView
        case BattleType.Splatfest:
            return FestView
        case BattleType.Salmonrun:
            return CoopView
    }
})
</script>

<style scoped></style>
