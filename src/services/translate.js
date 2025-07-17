const TranslateOps = {
    niutrans: {
        translate: async (sourceText, apikey, from, to) => {
            if (sourceText.trim() === "") return sourceText;

            const url = "https://api.niutrans.com/v2/text/translate";
            const CryptoJS = await import("crypto-js");

            const params = {
                from: TranslateOps.niutrans.getLanguageTag(from),
                to: TranslateOps.niutrans.getLanguageTag(to),
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
         * @param {String} languageCode language code that follows ISO 639 standard, with an unique one "auto"
         */
        getLanguageTag(languageCode) {
            switch (languageCode) {
                case "zh-cn":
                    return "zh";
                case "en":
                    return "en";
                case "ja":
                    return "ja";
                case "auto":
                    return "auto";
            }
        },
    },
};

export default TranslateOps;
