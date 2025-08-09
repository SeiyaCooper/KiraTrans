import { createWebHistory, createRouter } from "vue-router";
import Settings from "../pages/Settings.vue";
import Translation from "../pages/Translation.vue";
import OCR from "../pages/OCR.vue";
import TranslationSettings from "../pages/settings/TranslationSettings.vue";
import ThemeSettings from "../pages/settings/ThemeSettings.vue";
import CommonSettings from "../pages/settings/CommonSettings.vue";
import ScreenAreaSelection from "../pages/ScreenAreaSelection.vue";

const routes = [
    { path: "/", redirect: "/translation" },

    { path: "/translation", component: Translation },

    { path: "/ocr", component: OCR },

    { path: "/screen-area-selection", component: ScreenAreaSelection },

    { path: "/settings", component: Settings },
    { path: "/settings/translation", component: TranslationSettings },
    { path: "/settings/theme", component: ThemeSettings },
    { path: "/settings/common", component: CommonSettings },
];

export default createRouter({ mode: "history", history: createWebHistory(), routes });
