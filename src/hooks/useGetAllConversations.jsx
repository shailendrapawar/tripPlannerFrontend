import { useEffect } from "react"
import axios from "axios"
import { setAllConversations } from "../store/slice/conversationSlice"
import { useDispatch } from "react-redux"

const useGetAllConversations = () => {

    const dispatch=useDispatch()

    useEffect(() => {

        const fetchUserAllConversations = async () => {

            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + `/message/getUserAllConversations`, {
                    withCredentials: true
                })
                if (res) {
                    // console.log(res)
                    dispatch(setAllConversations(res.data.allConversations))
                }

            } catch (err) {
                console.log(err)
            }

        }
        fetchUserAllConversations()
    }, [])
}
export default useGetAllConversations