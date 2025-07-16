export default {
    niutrans: {
        translate: async (sourceText, apikey) => {
            const url = "https://api.niutrans.com/v2/text/translate";
            const CryptoJS = await import("crypto-js");

            const params = {
                from: "en",
                to: "zh",
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
            console.log(paramArr.join("&"));
            console.log(CryptoJS.MD5(CryptoJS.enc.Utf8.parse(paramArr.join("&"))).toString());

            const responce = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(params),
            });

            return await responce.json();
        },
    },
};
