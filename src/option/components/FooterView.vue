<template>
    <div flex="~ col" items-center font-sans text-xs>
        <p text-gray-400>
            This extension is not affiliated with Nintendo. All product names, logos, and brands are property of their
            respective owners.
        </p>
        <p>
            <a href="https://github.com/misenhower/splatoon3.ink/wiki/Data-Access" target="_blank">Data Access</a>
            -
            <a href="https://github.com/kayanouriko/chrome-extension-ink-calendar-3" target="_blank">Github</a>
            -
            <a href="https://kayanouriko.cc/" target="_blank">@kayanouriko</a>
            -
            <a
                href="https://chromewebstore.google.com/detail/ink-calendar-3/mnlhfcmbaadogjckmomandmdfiekjoog"
                target="_blank"
                >{{ version }}</a
            >
        </p>
    </div>
</template>

<script setup lang="ts">
const version = import.meta.env.DEV ? 'Version 1.0.0' : `Version ${chrome.runtime.getManifest().version}`
</script>
