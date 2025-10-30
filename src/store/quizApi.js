import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`,
    prepareHeaders: (headers) => {
      headers.set("apikey", import.meta.env.VITE_SUPABASE_ANON_KEY);
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "quizzes",
    }),
    getQuestions: builder.query({
      query: (id) => `questions?quiz_id=eq.${id}&select=*&order=id.asc`,
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuestionsQuery,
} = quizApi;
