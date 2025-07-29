<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { Languages, Settings } from "lucide-vue-next";
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
    <main class="main-content">
        <RouterView></RouterView>
    </main>
    <footer class="footer">
        <RouterLink to="/translation" class="nav-btn" exact-active-class="selected">
            <Languages class="icon"></Languages>
            <span class="nav-btn-text">{{ $t("pages.translation") }}</span>
        </RouterLink>
        <RouterLink to="/settings" class="nav-btn" exact-active-class="selected">
            <Settings class="icon"></Settings>
            <span class="nav-btn-text">{{ $t("pages.settings") }}</span>
        </RouterLink>
    </footer>
</template>

<style scoped>
.main-content {
    flex-grow: 1;
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
}

.nav-btn:hover {
    background-color: var(--background-light-1);
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
</style>
