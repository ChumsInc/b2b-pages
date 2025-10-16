import type {Keyword} from "b2b-types";
import {fetchJSON} from "@chumsinc/ui-utils";

export async function fetchKeywords():Promise<Keyword[]> {
    try {
        const url = `/api/b2b/keywords.json`;
        const res = await fetchJSON<{result: Keyword[]}>(url, {cache: 'no-cache'});
        return res?.result ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("loadKeywords()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadKeywords()", err);
        return Promise.reject(new Error('Error in loadKeywords()'));
    }
}
