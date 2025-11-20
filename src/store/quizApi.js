import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { supabase } from "../supabaseClient";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`,
    prepareHeaders: async (headers) => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      // console.log("JWT token exists");
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
    getUser: builder.query({
      query: (id) => `profiles?id=eq.${id}&select=*`,
    }),
    getResult: builder.query({
      query: (id) => `results?select=*,quizzes(name)&user_id=eq.${id}`,
      providesTags: (result, error, userId) =>
        result ? [{ type: "Results", id: userId }] : [],
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
      }),
      invalidatesTags: (result, error, { user_id }) => [{ type: "Results", id: user_id }],
    }),
    addUserName: builder.mutation({
      query: ({id, name}) => ({
        url:`/profiles?id=eq.${id}`,
        method: "PATCH",
        body:{name}
      })
    }),
  }),

});

export const {
  useGetQuizzesQuery,
  useGetQuestionsQuery,
  useAddResultMutation,
  useAddUserNameMutation,
  useGetResultQuery,
  useGetUserQuery,
} = quizApi;
