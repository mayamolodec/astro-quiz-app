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
      query: () => "quizzes?select=*",
    }),
    getQuestions: builder.query({
      query: (id) => `questions?quiz_id=eq.${id}&select=*&order=id.asc`,
    }),
    addResult: builder.mutation({
      query:({user_id, quiz_id, result}) =>({
        url:"/results",
        method: "POST",
        body:{
          user_id,
          quiz_id,
          result
        }
      })
    })
  }),

});

export const {
  useGetQuizzesQuery,
  useGetQuestionsQuery,
  useAddResultMutation,
} = quizApi;
