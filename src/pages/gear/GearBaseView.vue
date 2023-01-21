<template>
    <Suspense>
        <GearView class="fixed left-0 top-0" @close="close"></GearView>
        <template #fallback>
            <LodingView class="fixed left-0 top-0"></LodingView>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import GearView from './GearView.vue'
import LodingView from '../../components/loading/LodingView.vue'

const emit = defineEmits<{
    (event: 'close'): void
}>()

function close() {
    emit('close')
}
</script>
