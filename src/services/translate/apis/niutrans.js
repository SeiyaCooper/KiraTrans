import LANGUAGES from "../languages.js";

const niutrans = {
    translate: async (sourceText, apikey, from, to) => {
        if (sourceText.trim() === "") return sourceText;

        const url = "https://api.niutrans.com/v2/text/translate";
        const CryptoJS = await import("crypto-js");

        const params = {
            from: niutrans.getLanguageTag(from),
            to: niutrans.getLanguageTag(to),
            appId: "DQv1750342594631",
            srcText: sourceText,
            timestamp: Math.floor(+new Date() / 1000),
        };
        const paramsWithApiKey = { ...params, apikey };
        const sortedKeys = Object.keys(paramsWithApiKey).sort();

        let paramArr = [];
        for (const key of sortedKeys) {
            paramArr.push(`${key}=${paramsWithApiKey[key]}`);
        }

        params.authStr = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(paramArr.join("&"))).toString();

        const responce = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(params),
        });
        const responceContent = await responce.json();
        if (responceContent.errorMsg) throw new Error(`${responceContent.errorMsg}`);
        return responceContent;
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
};

export default niutrans;
