import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { quizApi } from "./quizApi"

export const store = configureStore({
    reducer: {
        [quizApi.reducerPath]: quizApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(quizApi.middleware),
});

setupListeners(store.dispatch);
