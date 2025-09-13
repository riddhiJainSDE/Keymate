import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../Features/todoslice'

export const store=configureStore({
    reducer: todoReducer
});