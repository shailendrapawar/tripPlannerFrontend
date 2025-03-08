import {createSlice} from "@reduxjs/toolkit"


const slice=createSlice({
    name:"trip",
    initialState:{
        exploreTrips:[]
    },
    reducers:{

        setExploreTrips:(state,action)=>{
            state.exploreTrips=action.payload
        }
    }
})

export const {setExploreTrips} =slice.actions
export default slice.reducer