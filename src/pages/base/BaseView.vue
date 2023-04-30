<template>
    <div class="w-[360px] h-[600px] bg-slate-50 flex flex-col">
        <Navbar :selected-type="state.selectedType"></Navbar>
        <router-view class="grow overflow-y-auto thin-scrollbar bg-slate-800" v-slot="{ Component }">
            <KeepAlive>
                <component :is="Component" />
            </KeepAlive>
        </router-view>
        <Tabbar :selected-type="state.selectedType" @change-tabbar-type="changeTabbarType"></Tabbar>
    </div>
</template>

<script setup lang="ts">
import Navbar from './BaseNavbar.vue'
import Tabbar from '../../components/tabbar/Tabbar.vue'

import { reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { BattleType, updateScheduleAndExLocaleDatas, createDatas } from '../../utils/datas'
import { getLastBattleType, setLastBattleType } from '../../utils/storage'
import { useI18n } from 'vue-i18n'
import { changeSplatfont, Locale } from '../../utils/useI18n'
import { getCurrentLocale } from '../../utils/storage'

// 先获取首页数据和额外的语言数据
const { datas, exLocale } = await updateScheduleAndExLocaleDatas()
// 切换语言环境并加载额外语言系统
let currentLocale: Locale
if (import.meta.env.DEV) {
    currentLocale = {
        name: 'English',
        code: 'en-US'
    }
} else {
    currentLocale = await getCurrentLocale()
}
const { locale, setLocaleMessage, getLocaleMessage } = useI18n()
if (locale.value !== currentLocale.code) {
    locale.value = currentLocale.code
}
changeSplatfont(currentLocale.code)
// 将额外语言加载
setLocaleMessage(currentLocale.code, {
    ...getLocaleMessage(currentLocale.code),
    splatnet: exLocale
})
// 加载 datas 模型
createDatas(datas)
// 正常流程
const battleType = await getLastBattleType()
// 创建当前选中的index
const state = reactive({ selectedType: battleType })
// 计算属性
const current = computed(() => {
    switch (state.selectedType) {
        case BattleType.Bankara:
            return 'bankara'
        case BattleType.Regular:
            return 'regular'
        case BattleType.X:
            return 'x'
        case BattleType.Splatfest:
            return 'fest'
        case BattleType.Salmonrun:
            return 'coop'
    }
})

// 获取路由
const router = useRouter()
router.push(`/main/${current.value}`)

function changeTabbarType(type: BattleType) {
    state.selectedType = type
    if (import.meta.env.DEV) {
        return
    }
    setLastBattleType(type)
}

watch(
    () => state.selectedType,
    () => {
        router.push(`/main/${current.value}`)
    }
)
</script>
