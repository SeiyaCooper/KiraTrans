<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toastContent = ref("");
const toastTitle = ref("");

let timer = null;

function openToast(content, { title = "", durationSec = 1 } = {}) {
    isOpen.value = true;
    toastContent.value = content;
    toastTitle.value = title;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        isOpen.value = false;
        timer = null;
    }, durationSec * 1000);
}

defineExpose({ openToast });
</script>

<template>
    <Transition name="toast">
        <div class="toast-container" v-show="isOpen">
            <p class="title" v-show="toastTitle !== ''">{{ toastTitle }}</p>
            <pre class="content">{{ toastContent }}</pre>
        </div>
    </Transition>
</template>

<style scoped>
.toast-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 999;
    width: fit-content;
    height: fit-content;
    min-width: 200px;
    min-height: 45px;
    max-width: 300px;
    max-height: 180px;
    overflow: auto;
    overflow-wrap: normal;
    background-color: var(--card-color);
    border-radius: 10px;
    border: 3px solid var(--border-color);
}

.title {
    color: var(--text-color);
    margin: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    height: min-content;
    text-align: center;
    font-size: 1.15rem;
    font-weight: bold;
    border-bottom: 1px solid var(--border-color-secondary);
}

.content {
    width: fit-content;
    height: fit-content;
    color: var(--text-color);
    margin: 5px;
    font-family: var(--font-family);
}

.toast-enter-active,
.toast-leave-active {
    transition: transform 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
    transform: translateX(110%);
}
</style>
