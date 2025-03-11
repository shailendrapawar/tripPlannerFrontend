import { useEffect } from "react"
import { setUserNotifications } from "../store/slice/userSlice"
import axios from "axios"
import { useDispatch } from "react-redux"
const useGetNotifications = () => {
  const dispatch = useDispatch()
  useEffect(() => {

    const fetchNotifications = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/auth/getUserNotifications`, {
        withCredentials: true
      })
      if (res) {
        // console.log(res.data.notifications)
        dispatch(setUserNotifications(res.data.notifications)
        )
      }
    }
    fetchNotifications()
  }, [])
}
export default useGetNotifications