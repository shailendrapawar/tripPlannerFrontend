import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        userHostedTrips:null,
        userNotifications:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload
        },
        setUserHostedTrips:(state,action)=>{
            state.userHostedTrips=action.payload
        },
        setUserNotifications:(state,action)=>{
            state.userNotifications=action.payload
        }
    }
})

export const{setAuthUser,setUserHostedTrips,setUserNotifications}=slice.actions;

export default slice.reducer
