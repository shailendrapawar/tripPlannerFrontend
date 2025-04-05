import { IoSearchCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux"
import { BiSolidSend } from "react-icons/bi";
import "./chatPage.css"
import { setSelectedConversation,setPrevConversation, setMessages,addMessage } from "../../store/slice/conversationSlice";
import { HiMiniUsers } from "react-icons/hi2";
import sampleTripImg from "../../assets/images/sampleTrip-img.jpg"
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import useGetConversationMessages from "../../hooks/useGetConversationMessages";
import SingleMessage from "./singleMessage/SingleMessage";

import selectChatImg from "../../assets/images/selectChatImg.svg"
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { IoArrowBackCircle } from "react-icons/io5";

const ChatPage = () => {

  const { authUser } = useSelector(s => s.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useGetConversationMessages()

  const { theme } = useSelector(s => s.theme)
  const { allConversations } = useSelector(s => s.conversation)
  const { selectedConversation } = useSelector(s => s.conversation)
  console.log(selectedConversation)
  const{prevConversation}=useSelector(s=>s.conversation)
  const { messages } = useSelector(s => s.conversation)
  const{socket}=useSelector(s=>s.socket);


  const [userMessage, setUserMessage] = useState("")

  // =====scrolling into bottom chats==============
  const bottomRef = useRef(null)
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])



  // =========for sending message=========
  const sendMessage = async () => {
    // console.log(userMessage)
    if (userMessage === "") {
      return
    }

    const isMsgSent = await axios.post(import.meta.env.VITE_API_URL + `/message/sendMessage/${selectedConversation._id}`, {
      message: userMessage,
      senderName: authUser.name
    }, {
      withCredentials: true
    })
    // console.log(isMsgSent.data.newMessage)
    if (isMsgSent) {
      // dispatch(setMessages([...messages, isMsgSent.data.newMessage]))
      setUserMessage("")
    }
    // console.log(isMsgSent)
  }


  // ============for sockets events================
  useEffect(()=>{
    if(!selectedConversation||!socket){
      return
    }
    if(prevConversation?._id){
      socket?.emit("leaveRoom",prevConversation?._id)
    }
    socket?.emit("joinRoom",selectedConversation?._id)
  
  },[selectedConversation,prevConversation,socket])


  useEffect(()=>{
    if(!socket)return

    // console.log(socket.connected?"connected":"not connected")
    const fn=(newMsg)=>{
      console.log(newMsg)
      dispatch(addMessage(newMsg));
    }

    socket?.on("getMsg",fn)
    return () => socket?.off("getMsg",fn)
   
  },[socket])


  return (
    <div className="h-[90%]  w-full flex justify-center items-center">
      <section className="h-130 w-full max-w-170 flex bg-white " style={{ border: `2px solid ${theme.dark}` }}>
        <aside className="w-1/3  pl-1 pr-1" style={{ backgroundColor: theme.dark, border: `1px solid ${theme.dark}` }}>
          <div className="h-16 flex justify-center items-center relative">

            <IoArrowBackCircle className="absolute -top-10 -left-2 w-8 h-8" onClick={()=>navigate(-1)}/>
            <h3 className="text-center  text-2xl">Groups</h3>
          </div>

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
            <img className="h-12 w-12 object-cover rounded-full" src={selectedConversation?.tripImg}></img>
            <p className="max-w-30 h-auto">{selectedConversation?.chatName}</p>
            <span className="flex w-10 h-5 absolute right-1 bottom-1 text-sm items-center"><HiMiniUsers className="h-4 w-5" /> : {selectedConversation?.users?.length}</span>
            <FaExternalLinkAlt className=" h-3 w-3" onClick={() => navigate(`/user/singleTripPage/${selectedConversation?.tripId}`)} />
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
              onChange={(e) => setUserMessage(e.target.value)}
              type="text" placeholder="enter message" className=" h-8 w-5/6 rounded-sm text-xs pl-1 pr-1 outline-gray-500 outline-2"></input>

            <span
              onClick={() => sendMessage()}
              className="h-9 w-9 flex items-center justify-center rounded-full p-2 active:scale-95" style={{ backgroundColor: theme.dark }}>
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
  const { selectedConversation,prevConversation } = useSelector(s => s.conversation)

  const dispatch = useDispatch();
  const isSelected = selectedConversation?._id === data?._id


  return (
    <div className="w-full min-h-10  max-h-10 bg-green-400 text-xs flex items-center justify-start p-1 overflow-ellipsis cursor-pointer"
      style={isSelected ? { backgroundColor: theme.primary, color: "white" } : { backgroundColor: theme.pastel }}
      onClick={() => {
        
          dispatch(setPrevConversation(selectedConversation))
        
        dispatch(setSelectedConversation(data))
      }}
    >

      <span className=" h-auto w-full ">{data?.chatName}</span>
    </div>

  )
}