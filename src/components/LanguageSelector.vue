<script setup>
import { useI18n } from "vue-i18n";
import { reactive, ref, watch } from "vue";

const { t } = useI18n();

const props = defineProps({
    languages: Array,
    selected: Object,
});
const selectedRef = ref(props.selected);

const emit = defineEmits(["change"]);
function handleSelect() {
    emit("change", selectedRef.value);
}

function select(language) {
    selectedRef.value = language;
}
defineExpose({ select });
</script>

<template>
    <select v-model="selectedRef" @change="handleSelect" class="language-selector">
        <option
            v-for="language in props.languages"
            :value="language"
            :class="['language-selector-option']"
            :disabled="language === selectedRef"
        >
            {{ language.label }}
        </option>
    </select>
</template>

<style scoped>
.language-selector {
    background-color: var(--background-light-1);
    color: var(--prime);
    box-sizing: border-box;
    border: 0;
    outline: 0;
    border-radius: 5px;
}

.language-selector:hover {
    border: 1px solid var(--prime);
}

.language-selector-option {
    color: var(--content-common);
}

.language-selector-option[disabled] {
    color: var(--background-light-3);
}
</style>
