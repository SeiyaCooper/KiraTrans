<script lang="js" setup>
import TranslateOps from "../services/translate.js";
import { getStore } from "../services/store.js";
import { ref, useTemplateRef } from "vue";
import Toast from "../components/Toast.vue";
import LanguageSelector from "../components/LanguageSelector.vue";
import { useI18n } from "vue-i18n";
import { listen } from "@tauri-apps/api/event";

const { t } = useI18n();

let handleInput = ref(() => {});
let handleSourceLangChange = ref(() => {});
let handleTargetLangChange = ref(() => {});
const translatedText = ref("");
const sourceText = ref("");
const toastRef = useTemplateRef("toast");

const supportLanguages = ref([
    { code: "zh-cn", label: t("languages.zh-cn") },
    { code: "en", label: t("languages.en") },
    { code: "ja", label: t("languages.ja") },
]);
const sourceLanguage = ref(supportLanguages.value[0]);
const sourceLanguageSelector = useTemplateRef("source-language-selector");
const targetLanguage = ref(supportLanguages.value[1]);
const targetLanguageSelector = useTemplateRef("target-language-selector");

let translateApi = undefined;
let apiKey = undefined;

const translate = async () => {
    console.log("translate fired");
    try {
        translatedText.value = (
            await TranslateOps[translateApi].translate(
                sourceText.value,
                apiKey,
                sourceLanguage.value.code,
                targetLanguage.value.code
            )
        ).tgtText;
    } catch (error) {
        toastRef.value?.openToast(error.message, { title: t("common.error"), durationSec: 3 });
    }
};

getStore().then(async (store) => {
    translateApi = await store.get("translate-api");
    apiKey = await store.get("translate-api-key");

    handleInput.value = translate;
    handleSourceLangChange.value = async (lang) => {
        if (sourceLanguage.value.code === lang) return;
        sourceLanguage.value = lang;
        store.set("source-language", lang.code);
        translate();
    };
    handleTargetLangChange.value = async (lang) => {
        if (targetLanguage.value.code === lang.code) return;
        targetLanguage.value = lang;
        store.set("target-language", lang.code);
        translate();
    };
    store.get("source-language").then((lang) => {
        const storedLanguage = supportLanguages.value.find((langObj) => langObj.code === lang);
        if (storedLanguage === undefined) return;
        sourceLanguage.value = storedLanguage;
        sourceLanguageSelector.value?.select(sourceLanguage.value);
    });
    store.get("target-language").then((lang) => {
        const storedLanguage = supportLanguages.value.find((langObj) => langObj.code === lang);
        if (storedLanguage === undefined) return;
        targetLanguage.value = storedLanguage;
        targetLanguageSelector.value?.select(targetLanguage.value);
    });
});

listen("window-unminimize", (event) => {
    sourceText.value = event.payload;
    translate();
});
</script>

<template>
    <div class="translation-page-container">
        <div class="language-select-section">
            <LanguageSelector
                :languages="supportLanguages"
                :selected="sourceLanguage"
                @change="handleSourceLangChange"
                ref="source-language-selector"
            ></LanguageSelector>
            <LanguageSelector
                :languages="supportLanguages"
                :selected="targetLanguage"
                @change="handleTargetLangChange"
                ref="target-language-selector"
            ></LanguageSelector>
        </div>
        <div class="translation-page-main-content">
            <textarea v-model="sourceText" @input="handleInput" class="source-text text-view"></textarea>
            <pre class="translated-text text-view">{{ translatedText }}</pre>
        </div>
        <Toast ref="toast"></Toast>
    </div>
</template>

<style scoped>
.translation-page-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
}

.language-select-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
    width: 100%;
    margin-top: 15px;
}

.translation-page-main-content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    flex: 1;
}

.text-view {
    width: 45%;
    height: calc(100% - 50px);
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    color: var(--content-common);
    font-size: 1rem;
    font-family: var(--font-family);
    border-radius: 10px;
    border: 1px solid var(--background-light-1);
    background-color: var(--background-light-0);
}

@media (max-width: 600px) {
    .translation-page-main-content {
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
    border: 1px solid var(--prime);
}

.translated-text {
    overflow: auto;
}
</style>
