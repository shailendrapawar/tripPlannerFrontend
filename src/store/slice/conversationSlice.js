import {createSlice} from "@reduxjs/toolkit"

const slice=  createSlice({
    name:"group",
    initialState:{
        allConversations:[],
        selectedConversation:null,
        messages:[],
        prevConversation:null
    },
    reducers:{
        setAllConversations:(state,action)=>{
            state.allConversations=action.payload
        },
        setSelectedConversation:(state,action)=>{
            // console.log(action.payload)
            state.selectedConversation=action.payload
        },
        setPrevConversation:(state,action)=>{
            // console.log(action.payload)
            console.log("called store")
            state.prevConversation=action.payload
        },
        
        setMessages:(state,action)=>{
            // console.log("called store")
            state.messages=action.payload
        },

        addMessage:(state,action)=>{
            state.messages=[...state.messages,action.payload]
        }
    }
})

export const{setAllConversations,setSelectedConversation,setMessages,setPrevConversation,addMessage}=slice.actions;

export default slice.reducer
