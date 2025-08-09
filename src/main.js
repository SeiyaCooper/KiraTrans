import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n/main.js";
import tinycolor from "tinycolor2";
import { default as router, gotoTranslation } from "./router/main.js";
import { listen } from "@tauri-apps/api/event";

const COLORS = {
    prime: "#fe63a1",
    "content-common": "#f0f8ff",
    background: "#121215",
};

for (const [name, color] of Object.entries(COLORS)) {
    attachColorMap(name, tinycolor(color));
}

function attachColorMap(name, color) {
    const root = document.documentElement;

    root.style.setProperty(`--${name}`, color.toString());

    for (let i = 0; i < 4; i++) {
        root.style.setProperty(`--${name}-light-${i}`, color.brighten(5 * (i + 1)).toString());
        root.style.setProperty(`--${name}-dark-${i}`, color.darken(5 * (i + 1)).toString());
        root.style.setProperty(
            `--${name}-transparent-${i}`,
            color
                .clone()
                .setAlpha(1 - 0.2 * (i + 1))
                .toString()
        );
    }
}

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount(document.body);

listen("window-unminimize", (event) => {
    gotoTranslation(event.payload);
});
