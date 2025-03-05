import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        userHostedTrips:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload
        },
        setUserHostedTrips:(state,action)=>{
            state.userHostedTrips=action.payload
        }
    }
})

export const{setAuthUser,setUserHostedTrips}=slice.actions;

export default slice.reducer
