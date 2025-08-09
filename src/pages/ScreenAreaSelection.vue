<script setup>
import { invoke, convertFileSrc } from "@tauri-apps/api/core";
import { currentMonitor, getCurrentWindow, Window } from "@tauri-apps/api/window";
import { appCacheDir } from "@tauri-apps/api/path";
import { reactive, ref, useTemplateRef } from "vue";

const imgUrl = ref("");

invoke("capture_full_screen").then(async () => {
    imgUrl.value = convertFileSrc(`${await appCacheDir()}/screen_capture.png`);

    const window = await getCurrentWindow();
    window.show();
});

const selectionBox = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
};

const selectionBoxEl = useTemplateRef("selection-box");

let isSelecting = false;
let startX, startY;

function handleMouseDown(e) {
    isSelecting = true;
    startY = e.pageY;
    startX = e.pageX;
}

function handleMouseMove(e) {
    if (isSelecting) {
        selectionBox.width = Math.abs(e.pageX - startX);
        selectionBox.height = Math.abs(e.pageY - startY);
        selectionBox.top = Math.min(e.pageY, startY);
        selectionBox.left = Math.min(e.pageX, startX);

        selectionBoxEl.value.style.left = `${selectionBox.left}px`;
        selectionBoxEl.value.style.top = `${selectionBox.top}px`;
        selectionBoxEl.value.style.width = `${selectionBox.width}px`;
        selectionBoxEl.value.style.height = `${selectionBox.height}px`;
    }
}

async function hnadleMouseUp() {
    isSelecting = false;

    const mainWindow = await Window.getByLabel("main");
    mainWindow.unminimize();

    const monitor = await currentMonitor();
    const ratio = monitor.scaleFactor;

    selectionBoxEl.value.style.display = "none";

    await invoke("capture_partial_screen", {
        x: Math.round(selectionBox.left * ratio),
        y: Math.round(selectionBox.top * ratio),
        width: Math.round(selectionBox.width * ratio),
        height: Math.round(selectionBox.height * ratio),
    });

    const window = await getCurrentWindow();
    window.close();
}
</script>

<template>
    <div
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="hnadleMouseUp"
        class="screen-area-selection-page-container"
    >
        <img :src="imgUrl" alt="screenshot" class="screenshot" />
        <div class="selection-box" ref="selection-box"></div>
    </div>
</template>

<style scoped>
.screen-area-selection-page-container {
    width: 100%;
    height: 100%;
    background-color: var(--background);
}

.screenshot {
    width: 100%;
    height: 100%;
    cursor: crosshair;
}

.selection-box {
    box-sizing: border-box;
    position: fixed;
    border: 1px solid var(--prime);
    background-color: var(--prime-transparent-3);
}
</style>
