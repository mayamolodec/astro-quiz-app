import { createSlice } from "@reduxjs/toolkit"

const quizSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes:[  {
            id:0,
            name: "Quiz #1",
            questions:5,
            score:null,
        
          },
          {
            id:1,
            name: "Quiz #2",
            questions:5,
            score:2
          },
          {
            id:2,
            name: "Quiz #3",
            questions: 4,
            score:3
          }],
    },
    reducers:{}
});

export default quizSlice.reducer;