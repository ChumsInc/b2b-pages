import {ContentPage} from "b2b-types";
import {fetchJSON} from "chums-components";

export async function fetchPages():Promise<ContentPage[]> {
    try {
        const url = `/api/b2b/pages.json`;
        const res = await fetchJSON<{pages: ContentPage[]}>(url, {cache: 'no-cache'});
        return res?.pages ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchPages()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchPages()", err);
        return Promise.reject(new Error('Error in fetchPages()'));
    }
}

export async function postPage(arg:ContentPage):Promise<ContentPage|null> {
    try {
        const body = JSON.stringify(arg);
        const url = !!arg.id ? `/api/b2b/pages/${encodeURIComponent(arg.id)}.json` : '/api/b2b/pages/page.json';
        const method = !!arg.id ? 'PUT' : 'POST';
        const res = await fetchJSON<{ page?: ContentPage }>(url, {method, body});
        return res?.page ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postPage()", err.message);
            return Promise.reject(err);
        }
        console.debug("postPage()", err);
        return Promise.reject(new Error('Error in postPage()'));
    }
}

export async function fetchPage(arg:number):Promise<ContentPage|null> {
    try {
        const url = `/api/b2b/pages/${encodeURIComponent(arg)}.json`;
        const res = await fetchJSON<{page: ContentPage|null}>(url, {cache: 'no-cache'});
        return res?.page ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("()", err.message);
            return Promise.reject(err);
        }
        console.debug("()", err);
        return Promise.reject(new Error('Error in ()'));
    }
}

export async function deletePage(arg:number):Promise<ContentPage[]> {
    try {
        const url = `/api/b2b/pages/${encodeURIComponent(arg)}.json`;
        const res = await fetchJSON<{pages: ContentPage[]}>(url, {method: 'DELETE', cache: 'no-cache'});
        return res?.pages ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("deletePage()", err.message);
            return Promise.reject(err);
        }
        console.debug("deletePage()", err);
        return Promise.reject(new Error('Error in deletePage()'));
    }
}

export const emptyPage:ContentPage = {
    id: 0,
    status: true,
    title: '',
    keyword: '',
    content: '',
    changefreq: 'monthly',
    filename: null,
    priority: 0,
    metaDescription: null,
    searchWords: null,
    requiresLogin: false,
}
