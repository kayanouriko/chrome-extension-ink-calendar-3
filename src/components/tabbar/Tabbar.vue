<template>
    <div class="bg-slate-600 flex justify-center">
        <button v-for="type in currentBattleTypes">
            <div class="group/item flex flex-col items-center" @click="$emit('changeTabbarType', type)">
                <div class="w-5 h-1" :class="selectedType == type ? 'bg-yellow-400' : 'bg-slate-600'"></div>
                <img
                    class="w-12 h-12 p-2 group-hover/item:grayscale-0"
                    :class="selectedType == type ? 'grayscale-0' : 'grayscale'"
                    :src="BattleType.getTypeIcon(type)"
                />
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { BattleType, useDatas } from '../../utils/datas'

const { selectedType } = defineProps<{
    selectedType: BattleType
}>()

defineEmits<{
    (event: 'changeTabbarType', type: BattleType): void
}>()

const { currentBattleTypes } = useDatas()
</script>
