import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/"}),
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => 'quizes',
    }),
  }),
});

export const { useGetQuizzesQuery } = quizApi;
