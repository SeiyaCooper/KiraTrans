import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
    base: "./",
    root: "./src/",
    clearScreen: false,
    server: {
        port: 1270,
        strictPort: true,
        host: host || false,
        watch: {
            ignored: ["**/src-tauri/**"],
        },
    },
    envPrefix: ["VITE_", "TAURI_ENV_"],
    build: {
        target: process.env.TAURI_ENV_PLATFORM == "windows" ? "chrome105" : "safari13",
        minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
        sourcemap: !!process.env.TAURI_ENV_DEBUG,
        rollupOptions: { input: "./src/index.html" },
    },
    plugins: [vue()],
});
