import LANGUAGES from "../languages.js";
import CryptoJS from "crypto-js";

const niutrans = {
    translate: async ({ sourceText, apiKey, from, to }) => {
        if (sourceText.trim() === "") return sourceText;

        const url = "https://api.niutrans.com/v2/text/translate";

        const params = {
            from: niutrans.getLanguageTag(from),
            to: niutrans.getLanguageTag(to),
            appId: "DQv1750342594631",
            srcText: sourceText,
            timestamp: Math.floor(+new Date() / 1000),
        };
        const paramsWithApiKey = { ...params, apikey: apiKey };
        const sortedKeys = Object.keys(paramsWithApiKey).sort();

        let paramArr = [];
        for (const key of sortedKeys) {
            paramArr.push(`${key}=${paramsWithApiKey[key]}`);
        }

        params.authStr = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(paramArr.join("&"))).toString();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(params),
        });
        const responseContent = await response.json();
        if (responseContent.errorMsg) throw new Error(`${responseContent.errorMsg}`);
        return responseContent.tgtText;
    },

    /**
     * @param {String} languageCode language code that KiraTrans supports.
     */
    getLanguageTag(languageCode) {
        switch (languageCode) {
            case LANGUAGES["zh-cn"]:
                return "zh";
            case LANGUAGES.en:
                return "en";
            case LANGUAGES.ja:
                return "ja";
            case "auto":
                return "auto";
        }
    },

    getSupportLanguages() {
        return Object.keys(LANGUAGES);
    },

    supportLanguageDetection: true,
    needAppId: false,
};

export default niutrans;
