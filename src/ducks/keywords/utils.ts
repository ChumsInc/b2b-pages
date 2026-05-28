import type {ContentPage, Keyword} from "chums-types/b2b";

export const keywordsListSorter = (a: Keyword, b: Keyword) => {
    return a.keyword.toLowerCase() > b.keyword.toLowerCase() ? 1 : -1;
}

export const emptyPageKeyword: Keyword = {
    pagetype: 'page',
    id: 0,
    keyword: '',
    title: '',
    parent: '',
    redirect_to_parent: 0,
    status: false,
}

export const pageToKeyword = (page: ContentPage): Keyword => {
    return {
        ...emptyPageKeyword,
        id: page.id,
        title: page.title ?? '',
        keyword: page.keyword ?? '',
        status: page.status
    };
}
