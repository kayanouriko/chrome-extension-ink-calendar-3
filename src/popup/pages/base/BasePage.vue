<template>
    <div w-full h-full relative text-white font-splatoon-content>
        <Transition>
            <div v-if="errorMsg !== undefined" absolute w-full h-full bg-dark1 flex="~ center" z-9999>
                <div flex="~ col" items-center space-y-3>
                    <p whitespace-pre-wrap text-center px-6>{{ errorMsg }}</p>
                    <button button-checked @click="$emit('reload')">Reload</button>
                </div>
            </div>
        </Transition>
        <Transition>
            <div v-if="isUpdating" absolute w-full h-full bg-dark1 flex="~ center" z-9999>
                <div flex="~ col" items-center>
                    <img w-16 h-16 src="/assets/images/ui/loading.gif" alt="loading" />
                    <p>loading...</p>
                </div>
            </div>
        </Transition>
        <slot absolute />
    </div>
</template>

<script setup lang="ts">
interface Props {
    isUpdating?: boolean
    errorMsg?: string
}

defineEmits<{
    (event: 'reload'): void
}>()

const { isUpdating = false, errorMsg = undefined } = defineProps<Props>()
</script>

<style scoped>
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
