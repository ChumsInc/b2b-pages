import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import pagesSlice from "@/ducks/pages";
import keywordsReducer from "@/ducks/keywords";
import {alertsSlice} from '@chumsinc/alert-list'
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    [alertsSlice.reducerPath]: alertsSlice.reducer,
    keywords: keywordsReducer,
    [pagesSlice.reducerPath]: pagesSlice.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error', 'meta.arg.signal'],
        }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
