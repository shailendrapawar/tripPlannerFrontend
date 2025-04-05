import {createSlice} from "@reduxjs/toolkit"

const slice=createSlice({
    name:"theme",
    initialState:{
        theme:{
            dark:"#495867",
            primary:"#1f7a8c",
            light:"#bfdbf7",
            pastel:"#e1e5f2"

            //brown===========
            // dark:"#2d3142",
            // primary:"#4f5d75",
            // light:"#bfc0c0",
            // pastel:"#ffffff"

            // dark blue , cream=======
            // dark:"#0d1821",
            // primary:"#344966",
            // light:"#b4cded",
            // pastel:"#f0f4ef"

            // , chatgpt, fun theme===
            // dark:"#2E3A59",
            // primary:"#00B2FF",
            // light:"#FFD93D",
            // pastel:"#6FFFE9"
        }
    },
    reducers:{

    }

})

export const {}=slice.actions;
export default slice.reducer;