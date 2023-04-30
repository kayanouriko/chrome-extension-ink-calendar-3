<template>
    <div class="w-[360px] h-[600px] bg-slate-800">
        <NavigationView class="h-[44px]">
            <slot name="navigation"></slot>
        </NavigationView>
        <div class="h-[calc(100%-44px)]">
            <NavigationLoadingView>
                <slot></slot>
            </NavigationLoadingView>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavigationLoadingView from './NavigationLoadingView.vue'
import NavigationView from './NavigationView.vue'
</script>
