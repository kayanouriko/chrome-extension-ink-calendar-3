<template>
    <div class="flex items-center px-2 pt-1 space-x-2">
        <img class="w-5 h-5" :src="getRuleIcon(rule.rule)" />
        <p class="font-splatoon2 text-white text-base" v-t="`splatnet.rules.${rule.id}.name`"></p>
        <p class="font-splatoon2 text-white text-sm bg-violet-600 px-1" v-if="mode" v-t="getModeTitle(mode)"></p>
    </div>
</template>

<script setup lang="ts">
import { Rule, useDatas } from '../../utils/datas'
import { getRuleIcon } from '../../utils/tool'

const { mode, rule } = defineProps<{
    rule: Rule
    mode?: string
}>()

const { getModeTitle } = useDatas()
</script>
