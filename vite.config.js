import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { cpSync } from "node:fs";

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
    plugins: [
        vue(),
        {
            name: "copy-assets",
            closeBundle() {
                const files = ["tesseract-core.wasm", "tesseract-core-fallback.wasm", "tesseract-worker.js"];
                const rootDir = dirname(fileURLToPath(import.meta.url));

                for (let file of files) {
                    cpSync(`${rootDir}/node_modules/tesseract-wasm/dist/${file}`, `${rootDir}/src/dist/assets/${file}`);
                }
            },
        },
    ],
    optimizeDeps: {
        exclude: ["tesseract-wasm"],
    },
});
