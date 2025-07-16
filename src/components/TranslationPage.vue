<script setup>
import TranslateOps from "../services/translate.js";
import { getStore } from "../services/store.js";
import { ref } from "vue";

let handleInput = () => {};

let translatedText = ref("");

getStore().then(async (store) => {
    const translateApi = await store.get("translate-api");
    const apiKey = await store.get("translate-api-key");

    handleInput = async (event) => {
        translatedText.value = await TranslateOps[translateApi].translate(event.target.value, apiKey);
    };
});
</script>

<template>
    <div class="container">
        <textarea @input="handleInput" class="source-text text-view"></textarea>
        <p class="translated-text text-view">{{ translatedText }}</p>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
}

.text-view {
    width: 45%;
    height: calc(100% - 50px);
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    color: var(--text-color);
    font-size: 1rem;
    font-family: Helvetica, Arial, sans-serif;
    border-radius: 10px;
    border: 1px solid var(--border-color-secondary);
    background-color: var(--card-color);
}

@media (max-width: 600px) {
    .container {
        flex-direction: column;
    }

    .text-view {
        width: calc(100% - 50px);
        height: 40%;
    }
}

.source-text {
    resize: none;
    outline: none;
}
.source-text:focus {
    border: 1px solid var(--border-color);
}
</style>
