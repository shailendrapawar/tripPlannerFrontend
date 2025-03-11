import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        userHostedTrips:null,
        userNotifications:[],

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
        },
        removeUserNotification:(state,action)=>{
            const index=state.userNotifications.findIndex((item)=>item._id===action.payload._id)
            state.userNotifications.splice(index,1)
        }

    }
})

export const{setAuthUser,setUserHostedTrips,setUserNotifications,removeUserNotification}=slice.actions;

export default slice.reducer
