import {configureStore} from '@reduxjs/toolkit'
import quizReduser from './quizSlice'

export default configureStore({
    reducer:{
        quizzes: quizReduser,
    }
})