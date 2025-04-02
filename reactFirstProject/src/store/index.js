import {configureStore} from '@reduxjs/toolkit'
import { quizApi } from './quizApi';
import { setupListeners } from '@reduxjs/toolkit/query'

export const store =  configureStore({
    reducer:{
        [quizApi.reducerPath]: quizApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});

setupListeners(store.dispatch);


