import { createWebHistory, createRouter } from "vue-router";
import SettingsPage from "../pages/SettingsPage.vue";
import TranslationPage from "../pages/TranslationPage.vue";

const routes = [
    { path: "/", redirect: "/translation" },
    { path: "/translation", component: TranslationPage },
    { path: "/settings", component: SettingsPage },
];

export default createRouter({ mode: "history", history: createWebHistory(), routes });
