import {ContentPage} from "b2b-types";
import {createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {deletePage, fetchPage, fetchPages, postPage} from "./api";
import {RootState} from "../../app/configureStore";
import {SortProps} from "chums-components";

export interface PagesState {
    list: ContentPage[];
    loading: boolean;
    current: {
        page: ContentPage | null;
        loading: boolean;
        saving: boolean;
    }
}

export const initialState: PagesState = {
    list: [],
    loading: false,
    current: {
        page: null,
        loading: false,
        saving: false,
    }
}


export const selectList = (state: RootState) => state.pages.list;
export const selectListLoading = (state: RootState) => state.pages.loading;
export const selectCurrentPage = (state: RootState) => state.pages.current.page;
export const selectCurrentLoading = (state: RootState) => state.pages.current.loading;
export const selectCurrentSaving = (state: RootState) => state.pages.current.saving;

export const defaultPagesSort: SortProps<ContentPage> = {
    field: 'id',
    ascending: true,
}

export const pageListSorter = (sort: SortProps<ContentPage>) => (a: ContentPage, b: ContentPage) => {
    const sortMod = sort.ascending ? 1 : -1;
    switch (sort.field) {
        case 'keyword':
        case 'title':
        case 'filename':
        case 'changefreq':
            return (
                (a[sort.field] ?? '').toLowerCase() === (b[sort.field] ?? '').toLowerCase()
                    ? (a.id - b.id)
                    : ((a[sort.field] ?? '').toLowerCase() > (b[sort.field] ?? '').toLowerCase() ? 1 : -1)
            ) * sortMod;
        case 'priority':
            return (
                a.priority === b.priority
                    ? (a.id - b.id)
                    : (a.priority - b.priority)
            ) * sortMod;
        default:
            return (a.id - b.id) * sortMod;
    }
}

export const loadPages = createAsyncThunk<ContentPage[]>(
    'pages/load',
    async () => {
        return await fetchPages();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectListLoading(state);
        }
    }
)

export const clearCurrentPage = createAction('pages/current/clear');

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


const pagesReducer = createReducer(initialState, builder => {
    builder
        .addCase(clearCurrentPage, (state) => {
            state.current.page = null;
        })
        .addCase(loadPages.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadPages.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.sort(pageListSorter(defaultPagesSort));
            if (state.current.page) {
                const [page] = state.list.filter(page => page.id === state.current.page?.id);
                state.current.page = page ?? null;
            }
        })
        .addCase(loadPages.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadPage.pending, (state) => {
            state.current.loading = true;
        })
        .addCase(loadPage.fulfilled, (state, action) => {
            state.current.loading = false;
            state.current.page = action.payload;
            if (action.payload) {
                state.list = [
                    ...state.list.filter(page => page.id !== action.payload?.id),
                    action.payload
                ].sort(pageListSorter(defaultPagesSort))
            }
        })
        .addCase(loadPage.rejected, (state) => {
            state.current.loading = false;
        })
        .addCase(savePage.pending, (state) => {
            state.current.saving = true;
        })
        .addCase(savePage.fulfilled, (state, action) => {
            state.current.saving = false;
            state.current.page = action.payload;
            if (action.payload) {
                state.list = [
                    ...state.list.filter(page => page.id !== action.payload?.id),
                    action.payload
                ].sort(pageListSorter(defaultPagesSort))
            }
        })
        .addCase(savePage.rejected, (state) => {
            state.current.saving = false;
        })
        .addCase(removePage.pending, (state) => {
            state.current.saving = true;
        })
        .addCase(removePage.fulfilled, (state, action) => {
            state.current.saving = false;
            state.current.page = null;
            state.list = action.payload.sort(pageListSorter(defaultPagesSort))
        })
        .addCase(removePage.rejected, (state) => {
            state.current.saving = false;
        });
})

export default pagesReducer;
