import { createI18n } from "vue-i18n";

export default createI18n({
    legacy: false,
    locale: "zh-cn",
    fallbackLocale: "zh-cn",
    messages: {
        "zh-cn": {
            pages: {
                settings: "设置",
                translation: "翻译",
            },
            apis: {
                chooseNotice: "选择翻译 API",
                setApiKeyNotice: "输入翻译 API Key",
                niutrans: "小牛翻译",
            },
            common: {
                submit: "确认",
            },
        },
        en: {
            pages: {
                settings: "Settings",
                translation: "Translate",
            },
            apis: {
                niutrans: "NiuTrans",
            },
        },
    },
    missingWarn: false,
    fallbackWarn: false,
});
