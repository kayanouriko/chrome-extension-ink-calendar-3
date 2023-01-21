<template>
    <div class="flex flex-col w-60">
        <div class="flex items-center space-x-4 m-5">
            <img class="w-7 h-7" src="/images/icon128.png" />
            <p class="text-xl font-bold" v-t="'option.title'"></p>
        </div>
        <button
            class="text-sm my-1 py-3 pl-6 flex items-center space-x-6 rounded-r-full"
            :class="
                selectedType == item
                    ? 'text-yellow-600 font-bold bg-yellow-100 hover:bg-yellow-100'
                    : 'text-gray-600 font-normal hover:bg-gray-300'
            "
            v-for="item in tabItems"
            @click="$emit('changeTabType', item)"
        >
            <p v-t="getTabTitle(item)"></p>
        </button>
    </div>
</template>

<script setup lang="ts">
import { TabType, useControl } from '../utils/control'

const { selectedType } = defineProps<{
    selectedType: TabType
}>()

defineEmits<{
    (event: 'changeTabType', type: TabType): void
}>()

const { tabItems, getTabTitle } = useControl()
</script>
