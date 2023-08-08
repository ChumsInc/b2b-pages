import {ContentPage, Keyword} from "b2b-types";
import {createAsyncThunk, createReducer, createSelector} from "@reduxjs/toolkit";
import {fetchKeywords} from "./api";
import {loadPage, loadPages, savePage, selectCurrentPage} from "../pages";
import {RootState} from "../../app/configureStore";

export interface KeywordsState {
    list: Keyword[];
    loading: boolean;
}

export const initialState:KeywordsState = {
    list: [],
    loading: false,
}

export const selectKeywordsList = (state:RootState) => state.keywords.list;
export const selectKeywordsLoading = (state:RootState) => state.keywords.loading;

export const selectCurrentKeyword = createSelector(
    [selectKeywordsList, selectCurrentPage],
    (list, page) => {
        const [keyword] = list.filter(kw => kw.keyword === page?.keyword);
        return keyword ?? null;
    }
)

export const loadKeywords = createAsyncThunk<Keyword[]>(
    'keywords/load',
    async () => {
        return await fetchKeywords();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectKeywordsLoading(state);
        }
    }
)

export const keywordsListSorter = (a:Keyword, b:Keyword) => {
    return a.keyword.toLowerCase() > b.keyword.toLowerCase() ? 1 : -1;
}

export const emptyPageKeyword:Keyword = {
    pagetype: 'page',
    id: 0,
    keyword: '',
    title: '',
    parent: '',
    redirect_to_parent: 0,
    status: false,
}

const pageToKeyword = (page:ContentPage):Keyword => {
    return {...emptyPageKeyword, id: page.id, title: page.title ?? '', keyword: page.keyword ?? '', status: page.status};
}

const keywordsReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadKeywords.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadKeywords.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.sort(keywordsListSorter);
        })
        .addCase(loadKeywords.rejected, (state) => {
            state.loading = false;
        })
        .addCase(savePage.fulfilled, (state, action) => {
            const list = state.list.filter(kw => kw.id !== action.meta.arg.id);
            if (action.payload && action.payload.keyword) {
                state.list = [
                    ...list,
                    pageToKeyword(action.payload)
                ].sort(keywordsListSorter);
            }
        })
        .addCase(loadPage.fulfilled, (state, action) => {
            if (action.payload && action.payload.keyword) {
                const list = state.list.filter(kw => kw.keyword !== action.payload?.keyword);
                const [existing] = state.list.filter(kw => kw.keyword === action.payload?.keyword);
                state.list = [
                    ...list,
                    pageToKeyword(action.payload)
                ].sort(keywordsListSorter);
            }
        })
        .addCase(loadPages.fulfilled, (state, action) => {
            const list = state.list.filter(kw => kw.pagetype !== 'page');
            state.list = [
                ...list,
                ...action.payload.map(page => pageToKeyword(page)),
            ].sort(keywordsListSorter);
        })
});

export default keywordsReducer;
