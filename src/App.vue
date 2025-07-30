<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { Languages, Settings } from "lucide-vue-next";
import { computed } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";

const route = useRoute();
const showNav = computed(() => {
    return route.path === "/translation" || route.path === "/settings";
});
</script>

<template>
    <div class="status-bar-space"></div>
    <main class="main-content">
        <RouterView v-slot="{ Component }">
            <Transition name="fade"><component :is="Component"></component></Transition>
        </RouterView>
    </main>
    <Transition name="nav-bar">
        <footer v-if="showNav" class="footer">
            <RouterLink to="/translation" class="nav-btn" exact-active-class="selected">
                <Languages class="icon"></Languages>
                <span class="nav-btn-text">{{ $t("pages.translation") }}</span>
            </RouterLink>
            <RouterLink to="/settings" class="nav-btn" exact-active-class="selected">
                <Settings class="icon"></Settings>
                <span class="nav-btn-text">{{ $t("pages.settings.name") }}</span>
            </RouterLink>
        </footer>
    </Transition>
</template>

<style scoped>
.status-bar-space {
    height: 30px;
    background-color: transparent;
}

/* Don't leave a space for immersive status bar on desktop devices */
@media (pointer: fine) {
    .status-bar-space {
        display: none;
    }
}

.main-content {
    flex-grow: 1;
    position: relative;
}

.main-content > * {
    position: absolute;
}

.footer {
    display: flex;
    justify-content: space-around;
    height: 65px;
    background-color: var(--background-light-0);
}

.nav-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 20%;
    box-sizing: border-box;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}

@media (pointer: fine) {
    .nav-btn:hover {
        background-color: var(--background-light-1);
    }
}

.icon {
    color: var(--content-common);
    transition:
        color 0.3s ease,
        transform 0.3s ease;
}

.nav-btn.selected > .icon {
    color: var(--prime);
    transform: translateY(-25%);
}

.nav-btn-text {
    height: 20%;
    font-size: 0.75rem;
    color: var(--content-common);
    transition: color 0.3s ease;
}

.nav-btn.selected > .nav-btn-text {
    color: var(--prime);
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(75%);
}

.nav-bar-enter-active,
.nav-bar-leave-active {
    transition: transform 0.3s ease;
}

.nav-bar-enter-from,
.nav-bar-leave-to {
    transform: translateY(110%);
}
</style>
