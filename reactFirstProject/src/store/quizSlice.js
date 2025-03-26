import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchQuizes = createAsyncThunk("fetchQuizes", async ()=> {
        const response = await fetch('/quizes', 
        {method:"get"});

        const data = await response.json();

        return data.map(({ _id, name}) => ({
          id: _id,
          name: name
      }));
})

const quizSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes:[],
        status:false,
        error:false,
    },
    reducers:{},
    extraReducers: (builder) =>{
      builder.addCase(fetchQuizes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
    }),
    builder.addCase(fetchQuizes.fulfilled, (state, action)=>{
        state.status = 'resolved';
        state.quizzes = action.payload;
    })
    builder.addCase(fetchQuizes.rejected, (state, action)=>{
        state.status = 'rejected';
        state.error = true;

    })
    },
});

export default quizSlice.reducer;