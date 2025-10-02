import LANGUAGES from "../languages.js";
import { invoke } from "@tauri-apps/api/core";
import CryptoJS from "crypto-js";

const tencent = {
    translate: async ({ sourceText, apiKey, appId, from, to }) => {
        if (sourceText.trim() === "") return sourceText;

        const url = "https://tmt.tencentcloudapi.com";

        const data = {
            SourceText: sourceText,
            Source: tencent.getLanguageTag(from),
            Target: tencent.getLanguageTag(to),
            ProjectId: 0,
        };

        const current = new Date();
        const currentSec = Math.floor(+current / 1000);
        const utcDate = current.toISOString().substring(0, 10);
        const requestBody = JSON.stringify(data);

        const canonicalRequest = `POST\n/\n\ncontent-type:application/json; charset=utf-8\nhost:tmt.tencentcloudapi.com\n\ncontent-type;host\n${CryptoJS.SHA256(requestBody).toString(CryptoJS.enc.Hex).toLowerCase()}`;
        const stringToSign = `TC3-HMAC-SHA256\n${currentSec}\n${utcDate}/tmt/tc3_request\n${CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex).toLowerCase()}`;
        const secretDate = CryptoJS.HmacSHA256(utcDate, `TC3${apiKey}`);
        const secretService = CryptoJS.HmacSHA256("tmt", secretDate);
        const secretSigning = CryptoJS.HmacSHA256("tc3_request", secretService);
        const singature = CryptoJS.HmacSHA256(stringToSign, secretSigning).toString(CryptoJS.enc.Hex);

        const requestStringHeader = {
            Authorization: `TC3-HMAC-SHA256 Credential=${appId}/${utcDate}/tmt/tc3_request, SignedHeaders=content-type;host, Signature=${singature}`,
            "X-TC-Action": "TextTranslate",
            "X-TC-Region": "ap-beijing",
            "Content-Type": "application/json; charset=utf-8",
            "X-TC-Version": "2018-03-21",
        };

        const requestIntegerHeader = {
            "X-TC-Timestamp": currentSec,
        };

        const response = await invoke("send_post_request_with_json", {
            uri: url,
            string_header_names: Object.keys(requestStringHeader),
            string_header_values: Object.values(requestStringHeader),
            integer_header_names: Object.keys(requestIntegerHeader),
            integer_header_values: Object.values(requestIntegerHeader),
            json: requestBody,
        });

        const responseContent = JSON.parse(response)["Response"];
        if (responseContent["Error"]) throw new Error(`${responseContent["Error"]["Message"]}`);
        return responseContent["TargetText"];
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
    needAppId: true,
};

export default tencent;
