<script setup>
import * as TranslateService from "../services/translate/index.js";
import { getStore } from "../services/store.js";
import { ref, useTemplateRef, watch } from "vue";
import Toast from "../components/Toast.vue";
import Selector from "../components/Selector.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

let handleInput = ref(() => {});
let handleSourceLangChange = ref(() => {});
let handleTargetLangChange = ref(() => {});
const translatedText = ref("");
const sourceText = ref("");
const toastRef = useTemplateRef("toast");

const supportSourceLanguages = ref(null);
const supportTargetLanguages = ref(null);
const sourceLanguage = ref(null);
const sourceLanguageSelector = useTemplateRef("source-language-selector");
const targetLanguage = ref(null);
const targetLanguageSelector = useTemplateRef("target-language-selector");

let translateApi = undefined;
let appId = undefined;
let apiKey = undefined;

let debouncer = undefined;
const translate = () => {
    if (supportSourceLanguages.length === 0 || supportTargetLanguages.length === 0) return;
    if (debouncer !== undefined) clearTimeout(debouncer);

    debouncer = setTimeout(async () => {
        try {
            translatedText.value = await TranslateService[translateApi].translate({
                sourceText: sourceText.value,
                apiKey,
                appId,
                from: sourceLanguage.value.code,
                to: targetLanguage.value.code,
            });
        } catch (error) {
            console.log(error);
            toastRef.value?.openToast(error.message, { title: t("common.error"), durationSec: 3 });
        }
    }, 500);
};

// Initialize from local store
getStore().then(async (store) => {
    translateApi = await store.get("translate-api");
    apiKey = await store.get("translate-api-key");
    appId = await store.get("translate-app-id");

    handleInput.value = translate;

    supportSourceLanguages.value = TranslateService[translateApi].getSupportLanguages().map((code) => {
        return { code, label: t(`languages.${code}`) };
    });
    supportTargetLanguages.value = TranslateService[translateApi].getSupportLanguages().map((code) => {
        return { code, label: t(`languages.${code}`) };
    });
    if (TranslateService[translateApi].supportLanguageDetection)
        supportSourceLanguages.value.push({
            code: "auto",
            label: t("languages.auto"),
        });

    store.get("source-language").then((lang) => {
        const storedLanguage = supportSourceLanguages.value.find((langObj) => langObj.code === lang);
        if (storedLanguage === undefined) {
            sourceLanguage.value = supportSourceLanguages.value[0];
        } else {
            sourceLanguage.value = storedLanguage;
        }
    });
    store.get("target-language").then((lang) => {
        const storedLanguage = supportTargetLanguages.value.find((langObj) => langObj.code === lang);
        if (storedLanguage === undefined) {
            targetLanguage.value = supportTargetLanguages.value[1];
        } else {
            targetLanguage.value = storedLanguage;
        }
    });

    handleSourceLangChange.value = async (lang) => {
        store.set("source-language", lang.code);
        translate();
    };
    handleTargetLangChange.value = async (lang) => {
        store.set("target-language", lang.code);
        translate();
    };
});

// Supports query
const { defaultSourceText = "" } = defineProps({
    defaultSourceText: String,
});

watch(
    () => defaultSourceText,
    (newText) => {
        sourceText.value = newText;

        if (supportSourceLanguages.value) {
            const languageDetection = supportSourceLanguages.value.find((langObj) => langObj.code === "auto");
            if (languageDetection !== undefined) {
                sourceLanguage.value = languageDetection;
            }
        }

        translate();
    },
    { immediate: true }
);
</script>

<template>
    <div class="translation-page-container">
        <div class="text-group">
            <Selector
                :options="supportSourceLanguages"
                v-model="sourceLanguage"
                @change="handleSourceLangChange"
                ref="source-language-selector"
                class="language-selector"
            ></Selector>
            <textarea v-model="sourceText" @input="handleInput" class="source-text text-view"></textarea>
        </div>

        <div class="text-group">
            <Selector
                :options="supportTargetLanguages"
                v-model="targetLanguage"
                @change="handleTargetLangChange"
                ref="target-language-selector"
                class="language-selector"
            ></Selector>
            <pre class="translated-text text-view">{{ translatedText }}</pre>
        </div>

        <Toast ref="toast"></Toast>
    </div>
</template>

<style scoped>
.translation-page-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
}

.language-selector {
    width: 75%;
    height: 50px;
    margin-bottom: 5px;
    font-size: 1rem;
}

.text-group {
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 90%;
    background-color: var(--background-light-0);
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;
}

.text-view {
    width: 100%;
    flex-grow: 1;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    color: var(--content-common);
    font-size: 1rem;
    font-family: var(--font-family);
    border-radius: 5px;
    border: 0;
    background-color: var(--background-light-1);
}

@media (max-width: 600px) {
    .translation-page-container {
        flex-direction: column;
    }

    .text-group {
        width: 90%;
        height: 45%;
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
