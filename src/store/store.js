import {combineReducers, configureStore} from "@reduxjs/toolkit"
import themeReducer from "../store/slice/themeSlice.js" 
import userReducer from "../store/slice/userSlice.js"
import tripReducer from "../store/slice/tripSlice.js"
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";
//====configuring the persist 
const persistConfig={
    key:"root",
    storage
}

//====combining reducer necceray for persist
const rootReducers=combineReducers({
    theme:themeReducer,
    user:userReducer,
    trip:tripReducer
})

//=====wrapping the persisten reducer==========
const persistedReducer=persistReducer(persistConfig,rootReducers)

 export const store=configureStore({
    reducer:persistedReducer,

    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({ serializableCheck:false})
    
})

export const persistor=persistStore(store)

