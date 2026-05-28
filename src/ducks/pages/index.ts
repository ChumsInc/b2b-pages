import type {ContentPage} from "chums-types/b2b";
import {createAsyncThunk, createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {deletePage, fetchPage, fetchPages, postPage} from "./api";
import {type RootState} from "@/app/configureStore";
import type {SortProps} from "chums-types";
import {dismissAlert} from "@chumsinc/alert-list";
import {pageListSorter} from "@/ducks/pages/utils.ts";

export interface PagesState {
    status: 'idle' | 'loading' | 'rejected';
    search: string;
    showInactive: boolean;
    sort: SortProps<ContentPage>,
    current: {
        page: ContentPage | null;
        status: 'idle' | 'loading' | 'saving' | 'deleting' | 'rejected';
    }
}

export const initialState: PagesState = {
    status: 'idle',
    search: '',
    showInactive: false,
    sort: {field: "keyword", ascending: true},
    current: {
        page: null,
        status: 'idle',
    }
}

const adapter = createEntityAdapter<ContentPage, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = adapter.getSelectors();

const pagesSlice = createSlice({
    name: 'pages',
    initialState: adapter.getInitialState(initialState),
    reducers: {
        toggleShowInactive: (state, action: PayloadAction<boolean>) => {
            state.showInactive = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSort: (state, action: PayloadAction<SortProps<ContentPage>>) => {
            state.sort = action.payload;
        },
        clearCurrentPage: (state) => {
            state.current.page = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPages.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadPages.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
                if (state.current.page) {
                    const [page] = action.payload.filter(page => page.id === state.current.page?.id);
                    state.current.page = page ?? null;
                }
            })
            .addCase(loadPages.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadPage.pending, (state) => {
                state.current.status = 'loading';
            })
            .addCase(loadPage.fulfilled, (state, action) => {
                state.current.status = 'idle';
                state.current.page = action.payload;
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(loadPage.rejected, (state) => {
                state.current.status = 'rejected';
            })
            .addCase(savePage.pending, (state) => {
                state.current.status = 'saving'
            })
            .addCase(savePage.fulfilled, (state, action) => {
                state.current.status = 'idle'
                state.current.page = action.payload;
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(savePage.rejected, (state) => {
                state.current.status = 'rejected';
            })
            .addCase(removePage.pending, (state) => {
                state.current.status = 'deleting'
            })
            .addCase(removePage.fulfilled, (state, action) => {
                state.current.status = 'idle'
                state.current.page = null;
                adapter.setAll(state, action.payload);
            })
            .addCase(removePage.rejected, (state) => {
                state.current.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('pages/')) {
                    state.status = 'idle';
                    state.current.status = 'idle';
                }
            })
    },
    selectors: {
        selectList: (state) => selectors.selectAll(state),
        selectSearch: (state) => state.search,
        selectSort: (state) => state.sort,
        selectShowInactive: (state) => state.showInactive,
        selectStatus: (state) => state.status,
        selectCurrentPage: (state) => state.current.page,
        selectCurrentPageStatus: (state) => state.current.status,
    }
});

export default pagesSlice;
export const {setSearch, setSort, clearCurrentPage, toggleShowInactive} = pagesSlice.actions;
export const {
    selectList,
    selectSearch,
    selectSort,
    selectShowInactive,
    selectStatus,
    selectCurrentPageStatus,
    selectCurrentPage
} = pagesSlice.selectors;


export const selectListLoading = (state: RootState) => state.pages.status === 'loading';
export const selectCurrentLoading = (state: RootState) => state.pages.current.status === 'loading';
export const selectCurrentSaving = (state: RootState) => state.pages.current.status === 'saving';

export const selectFilteredList = createSelector(
    [selectList, selectSearch, selectShowInactive, selectSort],
    (list, search, showInactive, sort) => {
        const regex = new RegExp('\\b' + search, 'i');
        return list
            .filter(page => showInactive || page.status)
            .filter(page => !search.trim() || (regex.test(page.title ?? '') || regex.test(String(page.id))))
            .sort(pageListSorter(sort));
    }
)

export const defaultPagesSort: SortProps<ContentPage> = {
    field: 'id',
    ascending: true,
}


export const loadPages = createAsyncThunk<ContentPage[]>(
    'pages/load',
    async () => {
        return await fetchPages();
    },
    {
        condition: (_, {getState}) => {
            const state = getState() as RootState;
            return !selectListLoading(state);
        }
    }
)

export const loadPage = createAsyncThunk<ContentPage | null, number>(
    'pages/current/load',
    async (arg) => {
        return await fetchPage(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg && !selectCurrentLoading(state) && !selectCurrentSaving(state);
        }
    }
)

export const savePage = createAsyncThunk<ContentPage | null, ContentPage>(
    'pages/current/save',
    async (arg) => {
        return await postPage(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg && !selectCurrentLoading(state) && !selectCurrentSaving(state);
        }
    }
)

export const removePage = createAsyncThunk<ContentPage[], ContentPage>(
    'pages/current/delete',
    async (arg) => {
        return await deletePage(arg.id);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg.id && !selectCurrentLoading(state) && !selectCurrentSaving(state);
        }
    }
)
