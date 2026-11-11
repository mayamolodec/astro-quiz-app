import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { supabase } from "../supabaseClient";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`,
    prepareHeaders: async (headers) => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("apikey", import.meta.env.VITE_SUPABASE_ANON_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "quizzes?select=*&order=name.asc",
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
