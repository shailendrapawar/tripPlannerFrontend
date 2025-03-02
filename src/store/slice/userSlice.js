import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"user",
    initialState:{
        authUser:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload
        }
    }
})

export const{setAuthUser}=slice.actions;

export default slice.reducer
