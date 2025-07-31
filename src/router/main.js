import { createWebHistory, createRouter } from "vue-router";
import Settings from "../pages/Settings.vue";
import Translation from "../pages/Translation.vue";
import TranslationSettings from "../pages/settings/TranslationSettings.vue";
import ThemeSettings from "../pages/settings/ThemeSettings.vue";
import CommonSettings from "../pages/settings/CommonSettings.vue";

const routes = [
    { path: "/", redirect: "/translation" },
    { path: "/translation", component: Translation },
    { path: "/settings", component: Settings },
    { path: "/settings/translation", component: TranslationSettings },
    { path: "/settings/theme", component: ThemeSettings },
    { path: "/settings/common", component: CommonSettings },
];

export default createRouter({ mode: "history", history: createWebHistory(), routes });
