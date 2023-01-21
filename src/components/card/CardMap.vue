<template>
    <div class="flex px-2 py-2 space-x-1">
        <div class="flex flex-col items-center" v-for="(stage, index) in stages" :key="stage.id">
            <img
                :class="index == 0 ? 'rounded-tl-lg rounded-bl-lg' : 'rounded-tr-lg rounded-br-lg'"
                :src="stage.image.url"
            />
            <p
                class="font-splatoon2 text-xs text-white bg-black py-0.5 px-1 -mt-2"
                v-t="`splatnet.stages.${stage.id}.name`"
            ></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Stage } from '../../utils/datas'

const { stages } = defineProps<{
    stages: Stage[]
}>()
</script>
