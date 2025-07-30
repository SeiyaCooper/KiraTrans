import { createI18n } from "vue-i18n";

export default createI18n({
    legacy: false,
    locale: "zh-cn",
    fallbackLocale: "zh-cn",
    messages: {
        "zh-cn": {
            pages: {
                settings: {
                    name: "设置",
                    translation: "翻译设置",
                },
                translation: "翻译",
            },
            apis: {
                chooseNotice: "选择翻译 API",
                setApiKeyNotice: "输入翻译 API Key",
                niutrans: "小牛翻译",
            },
            common: {
                submit: "确认",
                error: "错误",
            },
            languages: {
                "zh-cn": "中文（简体）",
                en: "英语",
                ja: "日语",
            },
        },
        en: {
            pages: {
                settings: {
                    neme: "Settings",
                },
                translation: "Translate",
            },
            apis: {
                niutrans: "NiuTrans",
            },
            common: {
                submit: "Submit",
                error: "Error",
            },
        },
    },
    missingWarn: false,
    fallbackWarn: false,
});
