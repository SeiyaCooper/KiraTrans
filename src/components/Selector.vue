<script setup>
import { useI18n } from "vue-i18n";
import { reactive, ref, watch } from "vue";

const { t } = useI18n();

const props = defineProps({
    options: Array,
});
const selected = defineModel();

const emit = defineEmits(["change"]);
function handleSelect() {
    emit("change", selected.value);
}

function select(option) {
    selected.value = option;
}
defineExpose({ select });
</script>

<template>
    <select v-model="selected" @change="handleSelect" class="selector">
        <option
            v-for="option in props.options"
            :value="option"
            :class="['selector-option']"
            :disabled="option === selected"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<style scoped>
.selector {
    background-color: var(--background-light-1);
    color: var(--prime);
    box-sizing: border-box;
    border: 0;
    outline: 0;
    border-radius: 5px;
}

.selector:hover {
    border: 1px solid var(--prime);
}

.selector-option {
    color: var(--content-common);
}

.selector-option[disabled] {
    color: var(--background-light-3);
}
</style>
