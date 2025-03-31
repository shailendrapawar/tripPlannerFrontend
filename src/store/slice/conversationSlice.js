import {createSlice} from "@reduxjs/toolkit"

const slice=  createSlice({
    name:"group",
    initialState:{
        allConversations:[],
        selectedConversation:null,
        messages:[],
    },
    reducers:{
        setAllConversations:(state,action)=>{
            state.allConversations=action.payload
        },
        setSelectedConversation:(state,action)=>{
            state.selectedConversation=action.payload
        },
        setMessages:(state,action)=>{
            state.messages=action.payload
        }
    }
})

export const{setAllConversations,setSelectedConversation,setMessages}=slice.actions;

export default slice.reducer
