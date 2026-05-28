import type {Keyword} from "chums-types/b2b";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchKeywords} from "@/ducks/keywords/api.ts";
import type {RootState} from "@/app/configureStore.ts";
import {selectKeywordsStatus} from "@/ducks/keywords/index.ts";

export const loadKeywords = createAsyncThunk<Keyword[], void, {state:RootState}>(
    'keywords/load',
    async () => {
        return await fetchKeywords();
    },
    {
        condition: (_, {getState}) => {
            const state = getState() as RootState;
            return selectKeywordsStatus(state) === 'idle';
        }
    }
)
