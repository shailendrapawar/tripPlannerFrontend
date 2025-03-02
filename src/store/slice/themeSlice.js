import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"theme",
    initialState:{
        theme:{
            dark:"#495867",
            primary:"#1f7a8c",
            light:"#bfdbf7",
            pastel:"#e1e5f2"
        }
    },
    reducers:{

    }

})

export const {}=slice.actions;
export default slice.reducer;