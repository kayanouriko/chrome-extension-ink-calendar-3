<template>
    <div w-full h-full relative text-white font-splatoon-content>
        <Transition>
            <div v-if="isError" absolute w-full h-full bg-dark1 flex="~ center" z-9999>
                <div flex="~ col" items-center space-y-3>
                    <p>Unknown error!</p>
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
    isError?: boolean
}

defineEmits<{
    (event: 'reload'): void
}>()

withDefaults(defineProps<Props>(), { isUpdating: false, isError: false })
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
