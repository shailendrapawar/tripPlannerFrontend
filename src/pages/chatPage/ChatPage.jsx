import { IoSearchCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import { BiSolidSend } from "react-icons/bi";
import "./chatPage.css"
import { setSelectedConversation,setMessages } from "../../store/slice/conversationSlice";
import { HiMiniUsers } from "react-icons/hi2";
import sampleTripImg from "../../assets/images/sampleTrip-img.jpg"
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import useConversationMessages from "../../hooks/useConversationMessages";
import SingleMessage from "./singleMessage/SingleMessage";

import selectChatImg from "../../assets/images/selectChatImg.svg"
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  useConversationMessages()

  const { theme } = useSelector(s => s.theme)
  const { allConversations } = useSelector(s => s.conversation)
  const { selectedConversation } = useSelector(s => s.conversation)
  const { messages } = useSelector(s => s.conversation)

  const [userMessage,setUserMessage]=useState("")


  // =====scrolling into bottom chats==============
  const bottomRef = useRef(null)
  useEffect(() => {
    bottomRef.current.scrollIntoView({behavior:"smooth",block:"end"})
  }, [messages])



  const sendMessage=async()=>{
    console.log(userMessage)
    if(userMessage===""){
      return
    }

    const isMsgSent=await axios.post(import.meta.env.VITE_API_URL+`/message/sendMessage/${selectedConversation._id}`,{
      message:userMessage
    },{
      withCredentials:true
    })
    console.log(isMsgSent.data.newMessage)
    if(isMsgSent){
    dispatch(setMessages([...messages,isMsgSent.data.newMessage]))
    }
    // console.log(isMsgSent)
  }

  return (
    <div className="h-[90%]  w-full flex justify-center items-center">
      <section className="h-130 w-full max-w-170 flex bg-white p-1" style={{ border: `1px solid ${theme.primary}` }}>
        <aside className="w-1/3  pl-1 pr-1" style={{ backgroundColor: theme.dark, border: `1px solid ${theme.dark}` }}>
          <h3 className="text-center ">Groups</h3>

          <div className="w-full flex items-center mt-2 bg-white">
            <input type="text" className="bg-transparent w-[80%] outline-none text-xs pl-1"></input>
            <IoSearchCircle className="h-8 w-8" />
          </div>

          <div className="scroll-class pt-2 pb-2 h-80 mt-2 flex flex-col overflow-y-scroll gap-1 ">
            {
              allConversations?.map((item, i) => {
                return <ConvoList data={item} key={i} />
              })
            }
          </div>
        </aside>

        <main className="w-2/3 h-full flex flex-col justify-center items-center" style={selectedConversation ? { display: "none" } : { display: "flex" }}>
          <img src={selectChatImg}></img>
          <h3 className="text-black text-2xl">Select Group</h3>
        </main>


        <main className="w-2/3 " style={selectedConversation ? { backgroundColor: theme.pastel, } : { display: "none" }}>
          <div className="h-1/8 w-full flex text-xs items-center gap-2 relative pl-2" style={selectedConversation ? { backgroundColor: theme.dark, color: theme.pastel } : { display: "none" }}>
            <img className="h-12 w-12 object-cover rounded-full" src={selectedConversation?.tripImg || sampleTripImg}></img>
            <p className="max-w-30 h-auto">{selectedConversation?.chatName}</p>
            <span className="flex w-10 h-5 absolute right-1 bottom-1 text-sm items-center"><HiMiniUsers className="h-4 w-5" /> : {selectedConversation?.users?.length}</span>
            <FaExternalLinkAlt className="absolute top-2 right-2 h-4 w-4" onClick={() => navigate(`/user/singleTripPage/${selectedConversation?.tripId}`)} />
          </div>


          <section className="scroll-class overflow-y-scroll  h-6/8 bg-white flex flex-col p-2 gap-3"  >
            {
              messages?.map((item, i) => {
                return <SingleMessage data={item} key={i} />
              })

            }
            <div className="bg-green-300" ref={bottomRef}></div>
          </section>



          <div className="h-1/8 bg-white flex items-center justify-evenly pl-1 pr-1 gap-1">
            <input
            value={userMessage}
            onChange={(e)=>setUserMessage(e.target.value)}
            type="text" placeholder="enter message" className=" h-8 w-5/6 rounded-md text-xs pl-1 pr-1 outline-gray-500 outline-2"></input>

            <span
            onClick={()=>sendMessage()}
            className="h-9 w-9 flex items-center justify-center rounded-full p-1.5 active:scale-95" style={{ backgroundColor: theme.dark }}>
              <BiSolidSend className="h-full w-full text-white" />
            </span>
          </div>


        </main>

      </section>
    </div>
  )
}
export default ChatPage


const ConvoList = ({ data }) => {

  const { theme } = useSelector(s => s.theme)
  const { selectedConversation } = useSelector(s => s.conversation)

  const dispatch = useDispatch();
  const isSelected = selectedConversation?._id === data?._id


  return (
    <div className="w-full min-h-10  max-h-10 bg-green-400 text-xs flex items-center justify-start p-1 overflow-ellipsis cursor-pointer"
      style={isSelected ? { backgroundColor: theme.primary, color: "white" } : { backgroundColor: theme.pastel }}
      onClick={() => dispatch(setSelectedConversation(data))}
    >

      <span className=" h-auto w-full ">{data?.chatName}</span>
    </div>

  )
}