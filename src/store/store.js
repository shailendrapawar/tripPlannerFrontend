import {combineReducers, configureStore} from "@reduxjs/toolkit"
import themeReducer from "../store/slice/themeSlice.js" 
import userReducer from "../store/slice/userSlice.js"
import tripReducer from "../store/slice/tripSlice.js"
import socketReducer from "./slice/socketSlice.js"
import conversationReducer from "../store/slice/conversationSlice.js"
import {persistReducer,persistStore} from "redux-persist"
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session"
//====configuring the persist 
const persistConfig={
    key:"root",
    storage:sessionStorage,
    blacklist:["socket"]
}

//====combining reducer necceray for persist
const rootReducers=combineReducers({
    theme:themeReducer,
    user:userReducer,
    trip:tripReducer,
    conversation:conversationReducer,
    socket:socketReducer
})


//=====wrapping the persisten reducer==========
const persistedReducer=persistReducer(persistConfig,rootReducers)

 export const store=configureStore({
    reducer:persistedReducer,

    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({ serializableCheck:false})
    
})

export const persistor=persistStore(store)

