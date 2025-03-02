import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "../store/slice/themeSlice.js" 
import userReducer from "../store/slice/userSlice.js"
const rootReducers={
    theme:themeReducer,
    user:userReducer
}

 export const store=configureStore({
    reducer:rootReducers
})