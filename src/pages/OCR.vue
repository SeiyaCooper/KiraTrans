<script setup>
import { ref, useTemplateRef } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const imageEl = useTemplateRef("screen-seleted");

function captureScreen() {
    invoke("start_screen_area_selection");
}
</script>

<template>
    <div class="ocr-page-container">
        <button @click="captureScreen" class="capture-btn">{{ t("dialogs['screen-area-selection']") }}</button>
        <img ref="screen-selected" />
    </div>
</template>

<style scoped>
.ocr-page-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.capture-btn {
    border: 1px solid var(--background-light-1);
    border-radius: 5px;
    background-color: var(--background-light-0);
    color: var(--content-common);
    margin: 30px;
    width: 75%;
    height: 100px;
    font-size: 1.5rem;
}
</style>
