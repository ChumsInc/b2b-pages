import {ContentPage} from "b2b-types";
import {fetchJSON} from "chums-components";

export async function fetchPages():Promise<ContentPage[]> {
    try {
        const url = `/api/b2b/pages`;
        const res = await fetchJSON<{pages: ContentPage[]}>(url, {cache: 'no-cache'});
        return res.pages ?? [];
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
        const res = await fetchJSON<{ page?: ContentPage }>('/api/b2b/pages', {method: 'POST', body});
        return res.page ?? null;
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
        const url = `/api/b2b/pages/${encodeURIComponent(arg)}`;
        const res = await fetchJSON<{pages: ContentPage[]}>(url, {cache: 'no-cache'});
        return res?.pages?.[0] ?? null;
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
        const url = `/api/b2b/pages/${encodeURIComponent(arg)}`;
        const res = await fetchJSON<{pages: ContentPage[]}>(url, {method: 'DELETE', cache: 'no-cache'});
        return res.pages ?? [];
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
}
