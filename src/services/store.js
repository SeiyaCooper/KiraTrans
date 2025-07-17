import { Store } from "@tauri-apps/plugin-store";

let storeInstance = null;

export async function getStore() {
    if (!storeInstance) {
        storeInstance = await Store.load(".kira_trans_datas");
    }
    return storeInstance;
}
