<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { getStore } from "../../services/store.js";
import BackBar from "../../components/BackBar.vue";
import Selector from "../../components/Selector.vue";
import * as TranslateService from "../../services/translate/index.js";

const { t } = useI18n();

const translateApis = [
    { name: "niutrans", label: t("apis.niutrans") },
    { name: "tencent", label: t("apis.tencent") },
];
const translateApi = ref(translateApis[0]);

let apiKey = "";
let appId = "";
let apiKeyPlaceHolder = ref("");
let appIdPlaceHolder = ref("");
let showAppIdInput = ref(false);

async function handleApiKeySubmit() {
    const store = await getStore();
    store.set("translate-api-key", apiKey);
    apiKeyPlaceHolder.value = "*".repeat(apiKey.length);
}

async function handleAppIdSubmit() {
    const store = await getStore();
    store.set("translate-app-id", appId);
    appIdPlaceHolder.value = "*".repeat(appId.length);
}

async function handleApiChoose() {
    const store = await getStore();
    await store.set("translate-api", translateApi.value.name);

    if (TranslateService[translateApi.value.name].needAppId) {
        showAppIdInput.value = true;
    } else {
        showAppIdInput.value = false;
    }
}

(async function loadSettings() {
    const store = await getStore();

    const apiName = await store.get("translate-api");
    const api = translateApis.find((translateApi) => {
        return translateApi.name === apiName;
    });
    translateApi.value = api;
    if (TranslateService[apiName].needAppId) showAppIdInput.value = true;

    const apiKey = await store.get("translate-api-key");
    if (apiKey) apiKeyPlaceHolder.value = "*".repeat(apiKey.length);

    const appId = await store.get("translate-app-id");
    if (appId) appIdPlaceHolder.value = "*".repeat(appId.length);
})();
</script>

<template>
    <div class="translation-settings-page-container">
        <BackBar class="desktop-back-bar"></BackBar>
        <div class="card">
            <p class="text">{{ $t("apis.chooseNotice") }}</p>
            <Selector v-model="translateApi" :options="translateApis" @change="handleApiChoose"></Selector>

            <p class="text">{{ $t("apis.setApiKeyNotice") }}</p>
            <form class="inner-card form" @submit.prevent="handleApiKeySubmit">
                <input
                    v-model="apiKey"
                    @submit="handleApiKeySubmit"
                    class="form-input"
                    :placeholder="apiKeyPlaceHolder"
                />
                <button type="submit" class="form-btn">{{ $t("common.submit") }}</button>
            </form>

            <p class="text" v-if="showAppIdInput">{{ $t("apis.setAppIdNotice") }}</p>
            <form class="inner-card form" @submit.prevent="handleAppIdSubmit" v-if="showAppIdInput">
                <input v-model="appId" @submit="handleAppIdSubmit" class="form-input" :placeholder="appIdPlaceHolder" />
                <button type="submit" class="form-btn">{{ $t("common.submit") }}</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.text {
    color: var(--content-common);
}

.translation-settings-page-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card {
    box-sizing: border-box;
    width: 90%;
    background-color: var(--background-light-0);
    border: 1px solid var(--background-light-1);
    border-radius: 10px;
    margin: 20px;
    padding: 10px;
    padding-bottom: 20px;
}

.inner-card {
    width: 100%;
    color: var(--content-common);
    background-color: var(--background);
    border: 1px solid var(--background-light-1);
    border-radius: 10px;
}

.form {
    height: 45px;
    position: relative;
    padding: 0;
}

.form-input {
    box-sizing: border-box;
    width: 80%;
    height: 45px;
    position: absolute;
    top: 0;
    padding: 0;
    padding-left: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: none;
    border-right: 1px solid var(--background-light-1);
    color: var(--content-common);
    background-color: var(--background);
    outline: none;
}

.form-input:focus {
    border: 1px solid var(--prime);
}

.form-btn {
    width: 20%;
    height: 45px;
    position: absolute;
    right: 0;
    border: none;
    color: var(--content-common);
    background-color: transparent;
}

.form-btn:hover {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid var(--prime);
}
</style>
