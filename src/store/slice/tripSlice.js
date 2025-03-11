import {createSlice} from "@reduxjs/toolkit"


const slice=createSlice({
    name:"trip",
    initialState:{
        exploreTrips:[]
    },
    reducers:{

        setExploreTrips:(state,action)=>{
            state.exploreTrips=action.payload
        },

        updateExploreTripCard:(state,action)=>{
            const index=state.exploreTrips.findIndex((item)=>item._id===action.payload._id)
            
            if(index!=-1){
                state.exploreTrips.splice(index,1,action.payload)
            }
        }
    }
})

export const {setExploreTrips,updateExploreTripCard} =slice.actions
export default slice.reducer