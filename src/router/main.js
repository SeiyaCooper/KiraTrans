import { createWebHistory, createRouter } from "vue-router";
import Settings from "../pages/Settings.vue";
import Translation from "../pages/Translation.vue";

const routes = [
    { path: "/", redirect: "/translation" },
    { path: "/translation", component: Translation },
    { path: "/settings", component: Settings },
];

export default createRouter({ mode: "history", history: createWebHistory(), routes });
