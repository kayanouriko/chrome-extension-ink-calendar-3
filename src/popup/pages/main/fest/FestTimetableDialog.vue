<template>
    <div
        v-show="show"
        class="modal-mask"
        fixed
        z-9999
        top-0
        left-0
        w-22.5rem
        h-37.5rem
        bg-white
        bg-op-20
        flex="~ center"
        p-8
    >
        <div
            class="modal-container"
            w-full
            max-h-full
            bg-gray-9
            rounded-xl
            font-splatoon-content
            text-white
            flex="~ col"
            overflow-auto
        >
            <!-- 段头 -->
            <div shrink-0 px-2 h-12 bg-black flex justify-between items-center>
                <button @click="$emit('close')">
                    <img square-7 src="/assets/images/ui/btn-close.webp" alt="menu" />
                </button>
                <p font-splatoon-title v-t="'splatfest.timetable'" />
                <div square-7 />
            </div>
            <!-- 时刻表 -->
            <div
                v-if="timetable && timetable.length > 0"
                pb-4
                flex="~ col"
                space-y-3
                overflow-y-auto
                overflow-x-clip
                thin-scrollbar
            >
                <!-- Card -->
                <div v-for="(item, index) in timetable" :key="index" flex="~ col">
                    <template v-if="item.stage">
                        <p v-if="index === 0 || item.isEarlyHour" text-yellow-4 font-splatoon-title px-4 pt-4 pb-3>
                            {{ item.yearShowTime }}
                        </p>
                        <p
                            mb-2
                            px-4
                            text-black
                            bg-yellow-4
                            font-splatoon-title
                            text-xs
                            rounded="rt-full rb-full"
                            self-start
                        >
                            {{ item.showTime }}
                        </p>
                        <img mx-4 h-5.125rem object-cover rounded-lg :src="item.stage.image" />
                        <p v-if="item.stage.name.length" class="-mt-2" px-1 py-0.5 text-xs self-center bg-black>
                            {{ t(`splatnet.stages.${item.stage.id}.name`, item.stage.name) }}
                        </p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Timetable } from '@popup/store/schedules'
import { useI18n } from 'vue-i18n'

defineProps<{
    show: boolean
    timetable: Timetable
}>()

const { t } = useI18n()
</script>
