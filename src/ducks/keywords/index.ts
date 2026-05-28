import type {Keyword} from "chums-types/b2b";
import {createEntityAdapter, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {loadPage, removePage, savePage} from "../pages";
import {loadKeywords} from "@/ducks/keywords/actions.ts";
import {pageToKeyword} from "@/ducks/keywords/utils.ts";
import {dismissAlert} from "@chumsinc/alert-list";

export interface KeywordsState {
    status: 'idle' | 'loading' | 'rejected'
}

export const initialState: KeywordsState = {
    status: 'idle'
}

const adapter = createEntityAdapter<Keyword, string>({
    selectId: (arg) => arg.keyword,
    sortComparer: (a, b) => a.keyword.localeCompare(b.keyword),
})
const selectors = adapter.getSelectors();

const keywordsSlice = createSlice({
    name: 'keywords',
    initialState: adapter.getInitialState(initialState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(removePage.fulfilled, (state, action) => {
                if (action.meta.arg.keyword) {
                    adapter.removeOne(state, action.meta.arg.keyword);
                }
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('keywords/')) {
                    state.status = 'idle';
                }
            })
            .addAsyncThunk(loadKeywords, {
                pending: (state) => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'idle';
                    adapter.setAll(state, action.payload);
                },
                rejected: (state) => {
                    state.status = 'rejected';
                }
            })
            .addMatcher(isAnyOf(savePage.fulfilled, loadPage.fulfilled), (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, pageToKeyword(action.payload))
                }
            })

    },
    selectors: {
        selectAllKeywords: (state) => selectors.selectAll(state),
        selectKeywordsStatus: (state) => state.status,
    }
});

export default keywordsSlice;
export const {selectAllKeywords, selectKeywordsStatus} = keywordsSlice.selectors

