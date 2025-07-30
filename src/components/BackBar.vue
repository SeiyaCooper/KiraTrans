<script setup>
import { ChevronLeft } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
    router.go(-1);
}
</script>

<template>
    <div class="back-bar-container">
        <button @click="goBack" class="back-bar-btn">
            <ChevronLeft></ChevronLeft>
        </button>
    </div>
</template>

<style scoped>
.back-bar-container {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid var(--background-light-1);
}

.back-bar-btn {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: 0;
    color: var(--content-common);
}
</style>
