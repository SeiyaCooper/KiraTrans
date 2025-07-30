<script setup>
import { useI18n } from "vue-i18n";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { ChevronDown } from "lucide-vue-next";
import { ref } from "vue";
import { getStore } from "../../services/store.js";
import BackBar from "../../components/BackBar.vue";

const { t } = useI18n();
const translateApis = [{ name: "niutrans", label: t("apis.niutrans") }];
const translateApi = ref(translateApis[0]);

let apiKey = "";
let apiKeyPlaceHolder = ref("");

async function handleApiKeySubmit() {
    const store = await getStore();
    store.set("translate-api-key", apiKey);
    apiKeyPlaceHolder.value = "*".repeat(apiKey.length);
}

async function handleApiChoose() {
    const store = await getStore();
    await store.set("translate-api", translateApi.value.name);
}

(async function loadSettings() {
    const store = await getStore();
    const apiKey = await store.get("translate-api-key");
    if (apiKey) apiKeyPlaceHolder.value = "*".repeat(apiKey.length);
})();
</script>

<template>
    <div class="translation-settings-page-container">
        <BackBar class="desktop-back-bar"></BackBar>
        <div class="card">
            <p class="text">{{ $t("apis.chooseNotice") }}</p>
            <Listbox v-model="translateApi">
                <ListboxButton class="list-box-btn inner-card">
                    <span class="list-box-btn-text">{{ translateApi.label }}</span>
                    <span class="list-box-btn-icon"><ChevronDown></ChevronDown></span>
                </ListboxButton>
                <ListboxOptions class="list-box-options">
                    <ListboxOption
                        class="list-box-option"
                        as="template"
                        v-for="api in translateApis"
                        :key="api.name"
                        :value="api"
                    >
                        <span @click.prevent="handleApiChoose" class="text">{{ api.label }}</span>
                    </ListboxOption>
                </ListboxOptions>
            </Listbox>
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

.list-box-btn {
    height: 50px;
    position: relative;
}

.list-box-btn > .list-box-btn-icon {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    right: 0;
    margin-right: 10px;
}

.list-box-btn > .list-box-btn-text {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    left: 0;
    margin-left: 10px;
}

.list-box-options {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
}

.list-box-option {
    font-size: 0.75rem;
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
