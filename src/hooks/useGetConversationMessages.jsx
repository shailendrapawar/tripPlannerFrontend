import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../store/slice/conversationSlice"
import axios from "axios"
import { useEffect } from "react"
const useGetConversationMessages = () => {

    const { selectedConversation } = useSelector(s => s.conversation)
    const dispatch =useDispatch()

    useEffect(() => {
        if (!selectedConversation) {
            return
        }
        const fetchConversationMessages = async () => {
            // axios.defaults.withCredentials=true
            try{
                const res = await axios.get(import.meta.env.VITE_API_URL + `/message/getSingleConversation/${selectedConversation?._id}`,{
                    withCredentials:true
               })
               if (res) {
                //    console.log(res.data.conversation)
                   dispatch(setMessages(res.data.conversation))
               }

            }catch(err){
                console.log(err)
            }
        }
        fetchConversationMessages()

    }, [selectedConversation])

}
export default useGetConversationMessages