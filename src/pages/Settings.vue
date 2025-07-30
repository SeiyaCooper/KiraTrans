<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
</script>

<template>
    <div class="settings-page-container">
        <button class="settings-enter" @click="$router.push('/settings/translation')">
            <span class="settings-enter-text">{{ $t("pages.settings.translation") }}</span>
            <ChevronRight class="settings-enter-icon"></ChevronRight>
        </button>
    </div>
</template>

<style scoped>
.settings-page-container {
    width: 100%;
    height: 100%;
}

.settings-enter {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
    height: 50px;
    padding-left: 20px;
    background-color: var(--background-light-0);
    border: 0;
}

.settings-enter-text {
    height: 50px;
    line-height: 50px;
    color: var(--content-common);
    font-weight: bold;
}

.settings-enter-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    color: var(--content-common);
}
</style>
