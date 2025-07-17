<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import TranslationPage from "./components/TranslationPage.vue";
import SettingsPage from "./components/SettingsPage.vue";
</script>

<template>
    <TabGroup as="div" class="app-content">
        <TabPanels class="tab-panels">
            <TabPanel as="template" :unmount="false"><TranslationPage></TranslationPage></TabPanel>
            <TabPanel as="template" :unmount="false"><SettingsPage></SettingsPage></TabPanel>
        </TabPanels>
        <TabList class="tab-list">
            <Tab as="template" #="{ selected }">
                <button :class="['tab', { selected }]">{{ $t("pages.translation") }}</button>
            </Tab>
            <Tab as="template" #="{ selected }">
                <button :class="['tab', { selected }]">{{ $t("pages.settings") }}</button>
            </Tab>
        </TabList>
    </TabGroup>
</template>

<style scoped>
.app-content {
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.tab-panels {
    width: 100vw;
    height: calc(100vh - 75px);
}

.tab-list {
    display: flex;
    width: 100vw;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    border-top: 3px solid var(--border-color);
}

.tab {
    flex: 1;
    position: relative;
    height: 75px;
    border: none;
    outline: none;
    color: var(--text-color);
    font-size: 1.15rem;
    font-weight: bold;
    background-color: var(--card-color);
}

.tab::after {
    content: "";
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background-color: var(--border-color);
    transition: width 0.1s;
}

.tab.selected::after {
    width: 80%;
}
</style>
