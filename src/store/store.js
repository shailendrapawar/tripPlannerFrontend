import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "../store/slice/themeSlice.js" 
import userReducer from "../store/slice/userSlice.js"
import tripReducer from "../store/slice/tripSlice.js"
const rootReducers={
    theme:themeReducer,
    user:userReducer,
    trip:tripReducer
}

 export const store=configureStore({
    reducer:rootReducers
})