<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";

const { t } = useI18n();

const props = defineProps({
    languages: Array,
    selected: Object,
});
const { language, selected } = props;
const selectedRef = ref(selected);

const emit = defineEmits(["change"]);
watch(selectedRef, (lang) => {
    emit("change", lang);
});

function select(language) {
    selectedRef.value = language;
}
defineExpose({ select });
</script>

<template>
    <Listbox as="div" class="language-selector-container" v-model="selectedRef">
        <ListboxButton class="language-selector-btn">
            <span>{{ selectedRef.label }}</span>
        </ListboxButton>
        <ListboxOptions class="language-selector-panel">
            <ListboxOption as="template" v-for="language in languages" :key="language.code" :value="language">
                <p class="language-label">{{ language.label }}</p>
            </ListboxOption>
        </ListboxOptions>
    </Listbox>
</template>

<style scoped>
:global(.language-selector-container) {
    position: relative;
}

.language-selector-btn {
    width: 45vw;
    height: 50px;
    padding: 0;
    color: var(--content-common);
    background-color: var(--background-light-0);
    border-radius: 10px;
    border: 1px solid var(--background-light-1);
}

@media (max-width: 600px) {
    .language-selector-btn {
        width: 40vw;
    }
}

.language-selector-panel {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    overflow-y: auto;
    margin: 0;
    margin-top: 10px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid var(--background-light-1);
    background-color: var(--background-light-0);
}

.language-label {
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid var(--background-light-1);
    background-color: var(--background);
    color: var(--content-common);
}
</style>
