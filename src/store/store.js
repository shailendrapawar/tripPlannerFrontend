import {configureStore} from "@reduxjs/toolkit"
import themeReducer from "../store/slice/themeSlice" 
const rootReducers={
    theme:themeReducer
}

 export const store=configureStore({
    reducer:rootReducers
})